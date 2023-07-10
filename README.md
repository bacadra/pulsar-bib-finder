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

The official Atom packages store has been [disabled](https://github.blog/2022-06-08-sunsetting-atom/). To obtain the latest version, please run the following shell command:

```shell
apm install bacadra/atom-bib-finder
```

This will allow you to directly download the package from the GitHub repository.

### Pulsar Text Editor

The package is compatible with [Pulsar](https://pulsar-edit.dev/) and can be installed using the following command:

```shell
ppm install bacadra/atom-bib-finder
```

Alternatively, you can directly install [bib-finder](https://web.pulsar-edit.dev/packages/bib-finder) from the Pulsar package store.

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

# Contributing [🍺](https://www.buymeacoffee.com/asiloisad)

If you have any ideas on how to improve the package, spot any bugs, or would like to support the development of new features, please feel free to share them via GitHub.
