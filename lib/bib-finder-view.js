'use babel'

import { CompositeDisposable } from 'atom'
import SelectListView from 'atom-select-list'
import fuzzaldrin from 'fuzzaldrin'
import fuzzaldrinPlus from 'fuzzaldrin-plus'
var fs = require("fs")
var path = require('path')
var glob = require('glob')
import { chdir, cwd } from 'process';
const bibtexParse = require('bibtex-parse');

export default class BibFinderView {

  constructor () {
    this.items = null

    this.selectListView = new SelectListView({

      items: [],

      maxResults: 50,

      emptyMessage: ' [NO MATCHES FOUND]',

      elementForItem: (item) => {
        query = this.selectListView.getQuery()

        li = document.createElement('li')
        li.classList.add('event', 'two-lines')

        titleEl = document.createElement('div')
        titleEl.classList.add('primary-line')
        this.highlightMatchesInElement(item.displayName, query, titleEl)
        li.appendChild(titleEl)

        secondaryEl = document.createElement('div')
        secondaryEl.classList.add('secondary-line')
        secondaryEl.classList.add('description')
        this.highlightMatchesInElement(item.description, query, secondaryEl)
        li.appendChild(secondaryEl)

        return li
      },

      didCancelSelection: () => { this.hide() },

      filter: (items, query) => {
        if (query.length===0) { return items }
        scoredItems = []
        for (let item of items) {
          item.score  = this.fuzz.score(item.displayName, query)
          item.score += this.fuzz.score(item.description, query)
          if (item.score<=0) { continue }
          scoredItems.push(item)
        }
        return scoredItems.sort((a,b) => b.score-a.score)
      },
    })

    this.selectListView.element.classList.add('command-palette')
    this.selectListView.element.classList.add('bib-finder')

    this.disposables = new CompositeDisposable()

    this.disposables.add(

      atom.commands.add(this.selectListView.element, {
        'bib-finder:name': () => this.didConfirmSelection('name'),
        'bib-finder:cite': () => this.didConfirmSelection('cite'),
        'bib-finder:opti': () => this.didConfirmSelection('opti'),
      }),

      atom.commands.add('atom-workspace', {
        'bib-finder:cache': () => this.cache(),
      }),

      atom.config.observe('command-palette.useAlternateScoring', (value) => {
        this.useAlternateScoring = value
      }),

      atom.config.observe('command-palette.preserveLastSearch', (value) => {
        this.preserveLastSearch = value
      }),

      atom.config.observe('bib-finder.getLocal', (value) => {
        this.getLocal = value
      }),

      atom.config.observe('bib-finder.allowDuplicate', (value) => {
        this.allowDuplicate = value
      }),

      atom.config.observe('bib-finder.reloadAlways', (value) => {
        this.reloadAlways = value
      }),

      atom.config.observe('bib-finder.bibPaths.path1', (value) => {
        this.bibPath1 = value
      }),

      atom.config.observe('bib-finder.bibPaths.path2', (value) => {
        this.bibPath2 = value
      }),

      atom.config.observe('bib-finder.bibPaths.path3', (value) => {
        this.bibPath3 = value
      }),

      atom.config.observe('bib-finder.bibPaths.path4', (value) => {
        this.bibPath4 = value
      }),

      atom.config.observe('bib-finder.bibPaths.path5', (value) => {
        this.bibPath5 = value
      }),

      atom.config.observe('bib-finder.bibPaths.array', (value) => {
        this.bibPathArray = value
      }),
    )
  }

  destroy() {
    this.disposables.dispose()
    this.disposIcons.dispose()
    this.selectListView.destroy()
  }

  show(id) {
    if (!this.panel) {this.panel = atom.workspace.addModalPanel({item: this.selectListView})}
    this.previouslyFocusedElement = document.activeElement
    this.update(id)
    if (this.preserveLastSearch) {
      this.selectListView.refs.queryEditor.selectAll()
    } else {
      this.selectListView.reset()
    }
    this.panel.show()
    this.selectListView.focus()
  }

  hide() {
    this.panel.hide()
    this.previouslyFocusedElement.focus()
  }

  toggle(id) {
    if (this.panel && this.panel.isVisible()) {
      this.hide()
    } else {
      this.show(id)
    }
  }

  update(id) {
    if (!this.items || this.reloadAlways) {
      this.selectListView.update({items:[], loadingMessage:'Indexing project\u2026', infoMessage:null})
      this.cache(id)
    }
  }

  cache(id) {
    paths = []
    if (id===1 || id===undefined){
      if (this.bibPath1) {paths.push(this.bibPath1)}
    }
    if (id===2 || id===undefined){
      if (this.bibPath2) {paths.push(this.bibPath2)}
    }
    if (id===3 || id===undefined){
      if (this.bibPath3) {paths.push(this.bibPath3)}
    }
    if (id===4 || id===undefined){
      if (this.bibPath4) {paths.push(this.bibPath4)}
    }
    if (id===5 || id===undefined){
      if (this.bibPath5) {paths.push(this.bibPath5)}
    }
    if (id===undefined && this.bibPathArray) {
      paths.push(...this.bibPathArray)
    }
    if (id===undefined && this.getLocal) {
      cwdZero = cwd()
      for (let pPath of atom.project.getPaths()) {
        chdir(pPath)
        for (let fPath of glob.sync('**/*.bib')) {
          paths.push(path.join(pPath, fPath))
        }
      }
      chdir(cwdZero)
    }

    this.items = [] ; keys = []

    for (fPath of paths) {
      try {
        if (!fs.existsSync(fPath)) {
          atom.notifications.addError(`The bib file ${fPath} does not exists`)
          continue
        }
        text = fs.readFileSync(fPath, 'utf-8');
        entries = bibtexParse.entries(text);
        for(let entry of entries) {
          if (keys.includes(entry.key)) {continue}
          var description="";
          for( key in entry){
            if (key==='key') {continue}
            description += `${entry[key]} | `;
          }
          description = description.slice(0, -3)
          this.items.push({displayName: entry.key, description: description})
          if (!this.allowDuplicate) {keys.push(entry.key)}
        }
      } catch (err) {}
    }

    this.selectListView.update({items:this.items, loadingMessage:null, infoMessage: 'Press Enter, Alt-Enter or Ctrl-Enter'})
  }

  get fuzz () {
    return this.useAlternateScoring ? fuzzaldrinPlus : fuzzaldrin
  }

  highlightMatchesInElement(text, query, el) {
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

  didConfirmSelection(mode) {
    item = this.selectListView.getSelectedItem()
    if (item) { this.hide() } else { return }
    editor = atom.workspace.getActiveTextEditor()
    if (mode==='name') {
      editor.insertText(item.displayName)
    } else if (mode==='cite') {
      editor.insertText(`\\cite{${item.displayName}}`)
    } else if (mode==='opti') {
      editor.insertText(`\\cite[]{${item.displayName}}`)
      cursors = editor.getCursors()
      for (cursor of cursors) {
        cursor.moveLeft(item.displayName.length+3)
      }
    }
  }
}
