'use babel'

import {CompositeDisposable} from 'atom'
import BibListView from './bib-finder-view'

export default {
  config: {
    preserveLastSearch: {
      title: 'Preserve Last Search',
      description: 'Preserve the last search when reopening the cite pallete',
      type: 'boolean',
      default: true,
    },
    useAlternateScoring: {
      title: 'Use Alternate Scoring',
      description: 'Use an alternative scoring approach which prefers run of consecutive characters, acronyms and start of words',
      type: 'boolean',
      default: false,
    },
    bibPaths: {
      title: 'BibTeX sources',
      description: 'Absolute path to the file with the bibliography',
      type: 'object',
      properties: {
        path1: {
          title: 'BibTeX source 1',
          type: 'string',
          default: '',
        },
        path2: {
          title: 'BibTeX source 2',
          type: 'string',
          default: '',
        },
        path3: {
          title: 'BibTeX source 3',
          type: 'string',
          default: '',
        },
        path4: {
          title: 'BibTeX source 4',
          type: 'string',
          default: '',
        },
        path5: {
          title: 'BibTeX source 5',
          type: 'string',
          default: '',
        },
      }
    },
  },

  activate () {
    this.disposables = new CompositeDisposable()

    this.disposables.add(atom.commands.add('atom-workspace', {
        'bib-finder:edit-source-1': () => this.editBibFile(1),
        'bib-finder:edit-source-2': () => this.editBibFile(2),
        'bib-finder:edit-source-3': () => this.editBibFile(3),
        'bib-finder:edit-source-4': () => this.editBibFile(4),
        'bib-finder:edit-source-5': () => this.editBibFile(5),
      })
    )

    this.disposables.add(atom.commands.add('atom-text-editor', {
      'bib-finder:insert-cite': () => {this.bibListView.toggle()},
      'bib-finder:insert-cite-from-source-1': () => {this.bibListView.toggle(1)},
      'bib-finder:insert-cite-from-source-2': () => {this.bibListView.toggle(2)},
      'bib-finder:insert-cite-from-source-3': () => {this.bibListView.toggle(3)},
      'bib-finder:insert-cite-from-source-4': () => {this.bibListView.toggle(4)},
      'bib-finder:insert-cite-from-source-5': () => {this.bibListView.toggle(5)},
    }))

    this.bibListView = new BibListView()
  },

  async deactivate () {
    this.disposables.dispose()
    await this.bibListView.destroy()
  },

  editBibFile(id) {
    path = atom.config.get(`bib-finder.bibPaths.path${id}`)
    if (path) {
      atom.workspace.open(path)
    } else {
      atom.notifications.addWarning(`The path of BibTeX-${id} has not been set!`)
    }
  },

}
