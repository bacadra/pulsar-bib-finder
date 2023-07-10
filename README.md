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

The package helps to find and insert bibliography keys. It supports multiple `.bib` files and utilizes fuzzy-finder for searching entries. The package can be used in any scope, making it suitable for files like LaTeX or Python (e.g., PyLaTeX).

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

To use the package, you need a bibliography file in BibTeX format (`.bib`). This file should be created and maintained by the user. There are two ways to use it:

* Globally: You can specify the file path in the package settings.
* Locally: You can copy the file to the project directory and enable the `bibLocal` flag.

Once you find the entry you want, you can press:
* `Enter` to insert `<key>`
* `Alt-Enter` to insert `\cite{<key>}`
* `Ctrl-Enter` to insert `\cite[]{<key>}`

You can use the special character `@` for searching by type or `#` for searching by key.

## Example of `.bib` file

Here's an example of the content in a bibliography file:

```bib
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
```

# Contributing [🍺](https://www.buymeacoffee.com/asiloisad)

If you have any ideas on how to improve the package, spot any bugs, or would like to support the development of new features, please feel free to share them via GitHub.
