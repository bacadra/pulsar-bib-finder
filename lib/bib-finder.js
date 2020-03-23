/** @babel */

import {CompositeDisposable} from 'atom'
import BacadraBibView from './bib-finder-view'

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
    this.BacadraBibView = new BacadraBibView()
    this.disposables = new CompositeDisposable()
    this.disposables.add(atom.commands.add('atom-text-editor', {
      'bib-finder:toggle': () => {
        this.BacadraBibView.toggle()
      }
    }))
    this.disposables.add(atom.config.observe('bib-finder.useAlternateScoring', (newValue) => {
      this.BacadraBibView.update({useAlternateScoring: newValue})
    }))
    this.disposables.add(atom.config.observe('bib-finder.preserveLastSearch', (newValue) => {
      this.BacadraBibView.update({preserveLastSearch: newValue})
    }))
    return this.BacadraBibView.show()
  },

  async deactivate () {
    this.disposables.dispose()
    await this.BacadraBibView.destroy()
  }
}
