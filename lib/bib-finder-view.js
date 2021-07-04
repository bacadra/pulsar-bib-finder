'use babel'

import SelectListView from 'atom-select-list'
import fuzzaldrin from 'fuzzaldrin'
import fuzzaldrinPlus from 'fuzzaldrin-plus'
var fs = require("fs")

const bibtex = require("@hygull/bibtex");

export default class BibListView {

  constructor () {
    this.selectListView = new SelectListView({
      initiallyVisibleItemCount: 10,
      items: [],
      filter: this.filter,
      emptyMessage: 'No matches found',
      elementForItem: (item, {index, selected, visible}) => {
        if (!visible) {
          return document.createElement("li")
        }

        const li = document.createElement('li')
        li.classList.add('event', 'two-lines')
        li.dataset.eventName = item.name

        const rightBlock = document.createElement('div')
        rightBlock.classList.add('pull-right')

        const leftBlock = document.createElement('div')
        const titleEl = document.createElement('div')
        titleEl.classList.add('primary-line')
        titleEl.title = item.name
        leftBlock.appendChild(titleEl)

        const query = this.selectListView.getQuery()
        this.highlightMatchesInElement(item.displayName, query, titleEl)

        let secondaryEl = document.createElement('div')
        secondaryEl.classList.add('secondary-line')

        if (typeof item.description === 'string') {
          secondaryEl.appendChild(this.createDescription(item.description, query))
        }

        if (Array.isArray(item.tags)) {
          const matchingTags = item.tags
            .map(t => [t, this.fuzz.score(t, query)])
            .filter(([t, s]) => s > 0)
            .sort((a, b) => a.s - b.s)
            .map(([t, s]) => t)

          if (matchingTags.length > 0) {
            secondaryEl.appendChild(this.createTags(matchingTags, query))
          }
        }

        leftBlock.appendChild(secondaryEl)

        li.appendChild(leftBlock)
        return li
      },

      didConfirmSelection: (keyBinding) => {
        this.hide()
        const editor = atom.workspace.getActiveTextEditor()

        if (this.modes[0]===1) {
          editor.insertText(keyBinding.name)
        } else if (this.modes[0]==2) {
          editor.insertText(`\\cite{${keyBinding.name}}`)
        }
      },

      didCancelSelection: () => {
        this.hide()
      }
    })

    this.modes = [1]

    atom.commands.add(this.selectListView.element, {
      'bib-finder:alt-select': (event) => {
        this.modes[0] = 2
        this.selectListView.confirmSelection();
        this.modes[0] = 1
        event.stopPropagation();
      }
    })


    this.selectListView.element.classList.add('bib-finder')
  }

  async destroy () {
    await this.selectListView.destroy()
  }

  toggle (id) {
    if (this.panel && this.panel.isVisible()) {
      this.hide()
      return Promise.resolve()
    } else {
      return this.show(id)
    }
  }

  async show (id) {
    if (!this.panel) {
      this.panel = atom.workspace.addModalPanel({item: this.selectListView})
    }

    if (atom.config.get('bib-finder.preserveLastSearch')) {
      this.selectListView.refs.queryEditor.selectAll()
    } else {
      this.selectListView.reset()
    }

    this.activeElement = (document.activeElement === document.body) ? atom.views.getView(atom.workspace) : document.activeElement

    paths = []

    if (id===1 || id===undefined){
    path1 = atom.config.get('bib-finder.bibPaths.path1')
    if (path1!='') {paths.push(path1)}}

    if (id===2 || id===undefined){
    path2 = atom.config.get('bib-finder.bibPaths.path2')
    if (path2!='') {paths.push(path2)}}

    if (id===3 || id===undefined){
    path3 = atom.config.get('bib-finder.bibPaths.path3')
    if (path3!='') {paths.push(path3)}}

    if (id===4 || id===undefined){
    path4 = atom.config.get('bib-finder.bibPaths.path4')
    if (path4!='') {paths.push(path4)}}

    if (id===5 || id===undefined){
    path5 = atom.config.get('bib-finder.bibPaths.path5')
    if (path5!='') {paths.push(path5)}}

    var content = []

    for (path of paths) {

      if (!fs.existsSync(path)) {
        atom.notifications.addError('The bib file "'+path1+'" does not exists')
        continue
      }

      const bib = new bibtex();

      const bibArr = bib.getBibAsObject(path);

      for (let i = 0; i < bibArr.length; i++) {
        row = bibArr[i]
        content.push({
          name:row.key,
          displayName:row.key,
          description: row.entryType + ' | ' + Object.values(row.data).join(' | ')
        })
      }
    }

    await this.selectListView.update({items: content})

    this.previouslyFocusedElement = document.activeElement
    this.panel.show()
    this.selectListView.focus()
  }

  hide () {
    this.panel.hide()
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus()
      this.previouslyFocusedElement = null
    }
  }

  get fuzz () {
    return atom.config.get('bib-finder:useAlternateScoring') ? fuzzaldrinPlus : fuzzaldrin
  }

  highlightMatchesInElement (text, query, el) {
    const matches = this.fuzz.match(text, query)
    let matchedChars = []
    let lastIndex = 0
    for (const matchIndex of matches) {
      const unmatched = text.substring(lastIndex, matchIndex)
      if (unmatched) {
        if (matchedChars.length > 0) {
          const matchSpan = document.createElement('span')
          matchSpan.classList.add('character-match')
          matchSpan.textContent = matchedChars.join('')
          el.appendChild(matchSpan)
          matchedChars = []
        }
        el.appendChild(document.createTextNode(unmatched))
      }

      matchedChars.push(text[matchIndex])
      lastIndex = matchIndex + 1
    }

    if (matchedChars.length > 0) {
      const matchSpan = document.createElement('span')
      matchSpan.classList.add('character-match')
      matchSpan.textContent = matchedChars.join('')
      el.appendChild(matchSpan)
    }

    const unmatched = text.substring(lastIndex)
    if (unmatched) {
      el.appendChild(document.createTextNode(unmatched))
    }
  }

  filter = (items, query) => {
    if (query.length === 0) {
      return items
    }

    const scoredItems = []
    for (const item of items) {
      let score = this.fuzz.score(item.displayName, query)
      if (item.tags) {
        score += item.tags.reduce(
          (currentScore, tag) => currentScore + this.fuzz.score(tag, query),
          0
        )
      }
      if (item.description) {
        score += this.fuzz.score(item.description, query)
      }

      if (score > 0) {
        scoredItems.push({item, score})
      }
    }
    scoredItems.sort((a, b) => b.score - a.score)
    return scoredItems.map((i) => i.item)
  }


  createDescription (description, query) {
    const descriptionEl = document.createElement('div')

    // in case of overflow, give full contents on long hover
    descriptionEl.title = description

    Object.assign(descriptionEl.style, {
      flexGrow: 1,
      flexShrink: 1,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    })
    this.highlightMatchesInElement(description, query, descriptionEl)
    return descriptionEl
  }

  createTag (tagText, query) {
    const tagEl = document.createElement('li')
    Object.assign(tagEl.style, {
      borderBottom: 0,
      display: 'inline',
      padding: 0
    })
    this.highlightMatchesInElement(tagText, query, tagEl)
    return tagEl
  }

  createTags (matchingTags, query) {
    const tagsEl = document.createElement('ol')
    Object.assign(tagsEl.style, {
      display: 'inline',
      marginLeft: '4px',
      flexShrink: 0,
      padding: 0
    })

    const introEl = document.createElement('strong')
    introEl.textContent = 'matching tags: '

    tagsEl.appendChild(introEl)
    matchingTags.map(t => this.createTag(t, query)).forEach((tagEl, i) => {
      tagsEl.appendChild(tagEl)
      if (i < matchingTags.length - 1) {
        const commaSpace = document.createElement('span')
        commaSpace.textContent = ', '
        tagsEl.appendChild(commaSpace)
      }
    })
    return tagsEl
  }
}
