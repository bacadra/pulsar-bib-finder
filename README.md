# bib-finder

![Tag](https://img.shields.io/github/v/tag/bacadra/atom-bib-finder?style=for-the-badge)
![LastCommit](https://img.shields.io/github/last-commit/bacadra/atom-bib-finder?style=for-the-badge)
![RepoSize](https://img.shields.io/github/repo-size/bacadra/atom-bib-finder?style=for-the-badge)
![Licence](https://img.shields.io/github/license/bacadra/atom-bib-finder?style=for-the-badge)

![bib-finder](https://github.com/bacadra/bib-finder/blob/master/assets/bib-finder.gif?raw=true)

The package help to find and insert bibliography key. Multiple `.bib` files can be used. The fuzzy-finder is used to look up entry. Package can be used in any scope, so it work fine in any file e.g. LaTeX, Python (like PyLaTeX).

## Installation

### Atom Text Editor

The official Atom packages store has been disabled. To get latest version run the shell command

    apm install bacadra/atom-bib-finder

and obtain the package directly from Github repository.

### Pulsar Text Editor

The package has compability with [Pulsar](https://pulsar-edit.dev/) and can be install

    pulsar -p install bacadra/atom-bib-finder

or directly [bib-finder](https://web.pulsar-edit.dev/packages/bib-finder) from Pulsar package store.

## Usage

The package requires a bibliography file in the BibTeX format `.bib`. This file need to be created and maintained by the user. To use it there are two ways:

* globally - you need write file path in package settings,
* locally - copy file to project directory. `bibLocal` flag must be ticked ON.

If you find entry you want, then you can press:
* `Enter` to insert `<key>`
* `Alt-Enter` to insert `\cite{<key>}`.
* `Ctrl-Enter` to insert `\cite[]{<key>}`.

## Example of `.bib`

The example content of the bibliography file::

    @book{fhck07,
      author    = "Hartmann, Friedel and Katz, Casimir",
      title     = "Structural Analysis with Finite Elements",
      publisher = "Springer-Verlag Berlin Heidelberg",
      address   = "Germany",
      year      = "2007",
      ISBN      = "10-3-540-49698",
    }

    @book{stng51,
      author    = "S. Timoshenko and J. N. Goodier",
      title     = "Theory of elasticity",
      publisher = "{McGRAW-HILL BOOK Company Inc.}",
      address   = "New York, Toronto, London",
      year      = "1951",
    }

# Contributing

If you have ideas on how to improve the package, see bugs or want to support new features - feel free to share it via GitHub.

See my other packages for Atom & Pulsar Text Editors:

* [autocomplete-sofistik](https://github.com/bacadra/atom-autocomplete-sofistik)
* [bib-finder](https://github.com/bacadra/atom-bib-finder)
* [hydrogen-run](https://github.com/bacadra/atom-hydrogen-run)
* [image-paste](https://github.com/bacadra/atom-image-paste)
* [language-sofistik](https://github.com/bacadra/atom-language-sofistik)
* [linter-ruff](https://github.com/bacadra/atom-linter-ruff)
* [navigation-panel](https://github.com/bacadra/atom-navigation-panel)
* [open-external](https://github.com/bacadra/atom-open-external)
* [pdf-viewer](https://github.com/bacadra/atom-pdf-viewer)
* [project-files](https://github.com/bacadra/atom-project-files)
* [regex-aligner](https://github.com/bacadra/atom-regex-aligner)
* [sofistik-tools](https://github.com/bacadra/atom-sofistik-tools)
* [super-select](https://github.com/bacadra/atom-super-select)
* [word-map](https://github.com/bacadra/atom-word-map)
