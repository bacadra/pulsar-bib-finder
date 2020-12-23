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
      'bib-finder:insert-cite': () => {
        this.BacadraBibView.toggle()
      }
    }))
    return this.BacadraBibView.show()
  },

  async deactivate () {
    this.disposables.dispose()
    await this.BacadraBibView.destroy()
  }
}
