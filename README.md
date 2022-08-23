# bib-finder

![bib-finder](https://github.com/bacadra/bib-finder/blob/master/assets/bib-finder.gif?raw=true)

The package help to find and insert bibliography key. Multiple `.bib` files can be used. The fuzzy-finder is used to look up entry. Package can be used in any scope, so it work fine in any file e.g. LaTeX, Python (like PyLaTeX).

## Installation

After the announcement of Atoms sunset, the official [Atom packages store](https://atom.io/packages) isn't respond properly, so latest version of this package cannot be downloaded there. To get latest version run the shell command

        apm install bacadra/atom-bib-finder

    and obtain the package directly from Github repository. Please note that package will occur in `Settings/Packages/Git Packages` instead of `Community Packages`.

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

If you have ideas on how to improve the package, see bugs or want to support new features, feel free to share them via GitHub.

    See my other packages dedicated to Atom Editor:
    
* [autocomplete-sofistik](https://github.com/bacadra/atom-autocomplete-sofistik)
* [bib-finder](https://github.com/bacadra/atom-bib-finder)
* [hydrogen-run](https://github.com/bacadra/atom-hydrogen-run)
* [image-paste](https://github.com/bacadra/atom-image-paste)
* [language-sofistik](https://github.com/bacadra/atom-language-sofistik)
* [navigation-panel](https://github.com/bacadra/atom-navigation-panel)
* [open-external](https://github.com/bacadra/atom-open-external)
* [pdf-viewer](https://github.com/bacadra/atom-pdf-viewer)
* [project-files](https://github.com/bacadra/atom-project-files)
* [regex-aligner](https://github.com/bacadra/atom-regex-aligner)
* [sofistik-tools](https://github.com/bacadra/atom-sofistik-tools)
* [super-select](https://github.com/bacadra/atom-super-select)
* [word-map](https://github.com/bacadra/atom-word-map)
