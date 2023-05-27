'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { CompositeDisposable } from 'atom'
import SelectListView from 'atom-select-list'
import { chdir, cwd } from 'process'
import fs from 'fs'
import path from 'path'
import glob from 'glob'
import bibtexParse from 'bibtex-parse'
import zadeh from 'zadeh'
import Diacritics from 'diacritic'

export default class BibList {

  constructor () {
    this.items = null

    this.slv = new SelectListView({
      items: [],
      maxResults: 50,
      emptyMessage: <div class='empty-message'>No matches found</div>,
      elementForItem: (item, {_, index, visible}) => {
        if (!visible) { return li }
        let query = Diacritics.clean(this.slv.getQuery())
        let matches = query.length>0 ? zadeh.match(Diacritics.clean(item.key + ' | ' + item.description), query) : []
        let li = document.createElement('li')
        li.classList.add('event', 'two-lines')
        let priBlock = document.createElement('div')
        priBlock.classList.add('primary-line')
        this.highlightMatchesInElement(item.key, matches, priBlock)
        let iconClass
        if (['book', 'booklet', 'inbook', 'incollection'].includes(item.type)) {
          iconClass = 'icon-book'
        } else if (item.type==='manual') {
          iconClass = 'icon-file-pdf'
        } else if (['mastersthesis', 'phdthesis'].includes(item.type)) {
          iconClass = 'icon-mortar-board'
        } else if (item.type==='techreport') {
          iconClass = 'icon-microscope'
        } else if (['article', 'conference', 'inproceedings', 'proceedings'].includes(item.type)) {
          iconClass = 'icon-law'
        } else if (item.type==='unpublished') {
          iconClass = 'icon-lock'
        } else {
          iconClass = 'icon-file'
        }
        priBlock.classList.add('icon-line', iconClass)
        li.appendChild(priBlock)
        let secBlock = document.createElement('div')
        secBlock.classList.add('secondary-line')
        secBlock.classList.add('description')
        this.highlightMatchesInElement(item.description, matches.map(x=>x-item.key.length-3), secBlock)
        li.appendChild(secBlock)
        li.addEventListener('contextmenu', () => { this.slv.selectIndex(index) })
        return li
      },
      didConfirmSelection: () => { this.didConfirmSelection() },
      didCancelSelection: () => { this.hide() },
      filter: (items, query) => {
        if (query.length===0) { return items }
        query = Diacritics.clean(query)
        let scoredItems = []
        for (let item of items) {
          item.score = zadeh.score(Diacritics.clean(item.key + ' | ' + item.description), query)
          if (item.score<=0) { continue }
          scoredItems.push(item)
        }
        return scoredItems.sort((a,b) => b.score-a.score)
      },
    })
    this.slv.element.classList.add('command-palette')
    this.slv.element.classList.add('bib-finder')
    this.slv.element.classList.add('bib-list')

    this.disposables = new CompositeDisposable()
    this.disposables.add(
      atom.commands.add(this.slv.element, {
        'bib-list:insert-name': () => this.didConfirmSelection(null, 'name'),
        'bib-list:insert-cite': () => this.didConfirmSelection(null, 'cite'),
        'bib-list:insert-opti': () => this.didConfirmSelection(null, 'opti'),
      }),
      atom.commands.add('atom-workspace', {
        'bib-finder:cache'             : () => this.cache ( ),
        'bib-finder:cite'              : () => this.toggle( ),
        'bib-finder:cite-from-source-1': () => this.toggle(1),
        'bib-finder:cite-from-source-2': () => this.toggle(2),
        'bib-finder:cite-from-source-3': () => this.toggle(3),
        'bib-finder:cite-from-source-4': () => this.toggle(4),
        'bib-finder:cite-from-source-5': () => this.toggle(5),
      }),
      atom.config.observe('command-palette.preserveLastSearch', (value) => {
        this.preserveLastSearch = value
      }),
      atom.config.observe('bib-finder.bibLocal', (value) => {
        this.bibLocal = value
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
    this.showKeystrokes = atom.config.get('bib-finder.showKeystrokes')
  }

  destroy() {
    this.disposables.dispose()
    this.disposIcons.dispose()
    this.slv.destroy()
  }

  show(id) {
    if (!this.panel) {this.panel = atom.workspace.addModalPanel({item: this.slv})}
    this.previouslyFocusedElement = document.activeElement
    this.update(id)
    if (this.preserveLastSearch) {
      this.slv.refs.queryEditor.selectAll()
    } else {
      this.slv.reset()
    }
    this.panel.show()
    this.slv.focus()
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
      this.slv.update({items:[], loadingMessage:'Indexing project\u2026', infoMessage:null})
      this.cache(id)
    }
  }

  cache(id) {
    let paths = []
    if (id===1 || !id){
      if (this.bibPath1) {paths.push(this.bibPath1)}
    }
    if (id===2 || !id){
      if (this.bibPath2) {paths.push(this.bibPath2)}
    }
    if (id===3 || !id){
      if (this.bibPath3) {paths.push(this.bibPath3)}
    }
    if (id===4 || !id){
      if (this.bibPath4) {paths.push(this.bibPath4)}
    }
    if (id===5 || !id){
      if (this.bibPath5) {paths.push(this.bibPath5)}
    }
    if (!id && this.bibPathArray) {
      paths.push(...this.bibPathArray)
    }
    let cwdZero, keys
    if (!id && this.bibLocal) {
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
    for (let fPath of paths) {
      try {
        if (!fs.existsSync(fPath)) {
          atom.notifications.addError(`The bib file ${fPath} does not exists`)
          continue
        }
        let text = fs.readFileSync(fPath, 'utf-8');
        let entries = bibtexParse.entries(text);
        for (let entry of entries) {
          if (keys.includes(entry.key)) { continue }
          let description = []
          for (let key in entry) {
            if (key==='key') {continue}
            description.push(entry[key])
          }
          description = description.join(' | ')
          this.items.push({key: entry.key, description: description, type:entry.type})
          if (!this.allowDuplicate) { keys.push(entry.key) }
        }
      } catch (err) {}
    }
    let infoMessage = this.showKeystrokes ? ['Press ', <span class='keystroke'>Enter</span>, ', ', <span class='keystroke'>Alt-Enter</span>, ' or ', <span class='keystroke'>Ctrl-Enter</span>] : null
    this.slv.update({items:this.items, loadingMessage:null, infoMessage:infoMessage})
  }

  highlightMatchesInElement(text, matches, el) {
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

  didConfirmSelection(item, mode) {
    if (!item) { item = this.slv.getSelectedItem() }
    if (!item) { return } else { this.hide() }
    if (!mode) { mode = 'name' }
    let editor = atom.workspace.getActiveTextEditor()
    if (!editor) { return }
    if (mode==='name') {
      editor.insertText(item.key)
    } else if (mode==='cite') {
      editor.insertText(`\\cite{${item.key}}`)
    } else if (mode==='opti') {
      editor.insertText(`\\cite[]{${item.key}}`)
      let cursors = editor.getCursors()
      for (let cursor of cursors) {
        cursor.moveLeft(item.key.length+3)
      }
    }
  }
}
