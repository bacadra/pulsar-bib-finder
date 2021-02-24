'use babel'

import {CompositeDisposable} from 'atom'
import BibListView from './bib-finder-view'

export default {

  config: {
    bibPath1: {
      type: 'string',
      default: '',
      order: 1,
    },
    bibPath2: {
      type: 'string',
      default: '',
      order: 2,
    },
    bibPath3: {
      type: 'string',
      default: '',
      order: 3,
    },
    bibPath4: {
      type: 'string',
      default: '',
      order: 4,
    },
    bibPath5: {
      type: 'string',
      default: '',
      order: 5,
    },
  },

  activate () {
    this.disposables = new CompositeDisposable()

    this.disposables.add(atom.commands.add('atom-workspace', {
        'bib-finde:edit-source-1': () => this.editBibFile(1),
        'bib-finde:edit-source-2': () => this.editBibFile(2),
        'bib-finde:edit-source-3': () => this.editBibFile(3),
        'bib-finde:edit-source-4': () => this.editBibFile(4),
        'bib-finde:edit-source-5': () => this.editBibFile(5),
      })
    )

    this.disposables.add(atom.commands.add('atom-text-editor', {
      'bib-finder:insert-cite': () => {
        this.bibListView.toggle()
      }
    }))

    this.bibListView = new BibListView()
  },

  async deactivate () {
    this.disposables.dispose()
    await this.bibListView.destroy()
  },

  editBibFile(id) {
    path = atom.config.get(`bib-finder.bibPath${id}`)
    if (path) {
      atom.workspace.open(path)
    } else {
      atom.notifications.addWarning(`The bibPath source ${id} is empty!`)
    }
  },

}
