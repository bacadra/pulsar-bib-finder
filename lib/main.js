const { CompositeDisposable } = require('atom')
const BibList = require('./bib-list')

module.exports = {

  config: {
    bibLocal: {
      order: 1,
      title: 'Find local bibliography files',
      description: 'Find and try parse all `.bib` files in open projects',
      type: 'boolean',
      default: true,
    },
    allowDuplicate: {
      order: 2,
      title: 'Allow duplicate keys',
      description: 'Allow duplicate keys in the list, otherwise only the first occurrence of the key will be presented',
      type: 'boolean',
      default: true,
    },
    reloadAlways: {
      order: 3,
      title: 'Always reload keys from all `.bib` sources',
      description: 'If not, then you need manual run command `bib-finder:cache` to recache sources',
      type: 'boolean',
      default: false,
    },
    showKeystrokes: {
      order: 4,
      title: "Enable keystroke hints",
      description: 'Info message with keystroke in lists',
      type: 'boolean',
      default: true,
    },
    showSource: {
      order: 5,
      title: "Show source path",
      description: 'Show path of source`.bib` file for each entry',
      type: 'boolean',
      default: true,
    },
    bibPaths: {
      order: 6,
      title: 'Bibliography sources as single path',
      description: 'Absolute paths to the files with the bibliography',
      type: 'object',
      properties: {
        path1: {
          order: 1,
          title: 'Bibliography source no. 1',
          type: 'string',
          default: '',
        },
        path2: {
          order: 2,
          title: 'Bibliography source no. 2',
          type: 'string',
          default: '',
        },
        path3: {
          order: 3,
          title: 'Bibliography source no. 3',
          type: 'string',
          default: '',
        },
        path4: {
          order: 4,
          title: 'Bibliography source no. 4',
          type: 'string',
          default: '',
        },
        path5: {
          order: 5,
          title: 'Bibliography source no. 5',
          type: 'string',
          default: '',
        },
        array: {
          order: 6,
          title: 'Array of sources',
          description: 'Array of paths, separated by comma',
          type: 'array',
          items: {
            type: 'string',
          },
          default: [],
        },
      },
    },
  },

  activate () {
    this.disposables = new CompositeDisposable()
    this.disposables.add(atom.commands.add('atom-workspace', {
        'bib-finder:open-source-1': () => this.openBibFile(1),
        'bib-finder:open-source-2': () => this.openBibFile(2),
        'bib-finder:open-source-3': () => this.openBibFile(3),
        'bib-finder:open-source-4': () => this.openBibFile(4),
        'bib-finder:open-source-5': () => this.openBibFile(5),
      })
    )
    this.bibList = new BibList(this)
  },

  deactivate () {
    this.disposables.dispose()
    this.bibList.destroy()
  },

  openBibFile(id) {
    let filePath = atom.config.get(`bib-finder.bibPaths.path${id}`)
    if (filePath) {
      atom.workspace.open(filePath)
    } else {
      atom.notifications.addError(`The path of BibTeX-${id} has not been set`)
    }
  },

  consumeClassIcons(object) {
    this.getIconClass = object.iconClassForPath;
  },
}
