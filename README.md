# bib-finder

<p align="center">
  <a href="https://github.com/bacadra/atom-bib-finder/tags">
  <img src="https://img.shields.io/github/v/tag/bacadra/atom-bib-finder?style=for-the-badge&label=Latest&color=blue" alt="Latest">
  </a>
  <a href="https://github.com/bacadra/atom-bib-finder/issues">
  <img src="https://img.shields.io/github/issues-raw/bacadra/atom-bib-finder?style=for-the-badge&color=blue" alt="OpenIssues">
  </a>
  <a href="https://github.com/bacadra/atom-bib-finder/blob/master/package.json">
  <img src="https://img.shields.io/github/languages/top/bacadra/atom-bib-finder?style=for-the-badge&color=blue" alt="Language">
  </a>
  <a href="https://github.com/bacadra/atom-bib-finder/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/bacadra/atom-bib-finder?style=for-the-badge&color=blue" alt="Licence">
  </a>
</p>

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

The special character `@` can be used for search by type or `#` for search by key.

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
<p align="center">
<a href="https://github.com/bacadra/atom-autocomplete-sofistik"><img src="https://img.shields.io/github/v/tag/bacadra/atom-autocomplete-sofistik?style=for-the-badge&label=autocomplete-sofistik&color=blue" alt="autocomplete-sofistik">
<a href="https://github.com/bacadra/atom-bib-finder"><img src="https://img.shields.io/github/v/tag/bacadra/atom-bib-finder?style=for-the-badge&label=bib-finder&color=blue" alt="bib-finder">
<a href="https://github.com/bacadra/atom-hydrogen-run"><img src="https://img.shields.io/github/v/tag/bacadra/atom-hydrogen-run?style=for-the-badge&label=hydrogen-run&color=blue" alt="hydrogen-run">
<a href="https://github.com/bacadra/atom-image-paste"><img src="https://img.shields.io/github/v/tag/bacadra/atom-image-paste?style=for-the-badge&label=image-paste&color=blue" alt="image-paste">
<a href="https://github.com/bacadra/atom-language-sofistik"><img src="https://img.shields.io/github/v/tag/bacadra/atom-language-sofistik?style=for-the-badge&label=language-sofistik&color=blue" alt="language-sofistik">
<a href="https://github.com/bacadra/atom-linter-ruff"><img src="https://img.shields.io/github/v/tag/bacadra/atom-linter-ruff?style=for-the-badge&label=linter-ruff&color=blue" alt="linter-ruff">
<a href="https://github.com/bacadra/atom-navigation-panel"><img src="https://img.shields.io/github/v/tag/bacadra/atom-navigation-panel?style=for-the-badge&label=navigation-panel&color=blue" alt="navigation-panel">
<a href="https://github.com/bacadra/atom-open-external"><img src="https://img.shields.io/github/v/tag/bacadra/atom-open-external?style=for-the-badge&label=open-external&color=blue" alt="open-external">
<a href="https://github.com/bacadra/atom-pdf-viewer"><img src="https://img.shields.io/github/v/tag/bacadra/atom-pdf-viewer?style=for-the-badge&label=pdf-viewer&color=blue" alt="pdf-viewer">
<a href="https://github.com/bacadra/atom-project-files"><img src="https://img.shields.io/github/v/tag/bacadra/atom-project-files?style=for-the-badge&label=project-files&color=blue" alt="project-files">
<a href="https://github.com/bacadra/atom-regex-aligner"><img src="https://img.shields.io/github/v/tag/bacadra/atom-regex-aligner?style=for-the-badge&label=regex-aligner&color=blue" alt="regex-aligner">
<a href="https://github.com/bacadra/atom-sofistik-tools"><img src="https://img.shields.io/github/v/tag/bacadra/atom-sofistik-tools?style=for-the-badge&label=sofistik-tools&color=blue" alt="sofistik-tools">
<a href="https://github.com/bacadra/atom-super-select"><img src="https://img.shields.io/github/v/tag/bacadra/atom-super-select?style=for-the-badge&label=super-select&color=blue" alt="super-select">
<a href="https://github.com/bacadra/atom-word-map"><img src="https://img.shields.io/github/v/tag/bacadra/atom-word-map?style=for-the-badge&label=word-map&color=blue" alt="word-map">
</p>
