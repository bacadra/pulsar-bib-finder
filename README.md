# bib-finder

![bib-finder](https://github.com/bacadra/bib-finder/blob/master/assets/bib-finder.gif?raw=true)

The package help to find and insert bibliography key. Multiple `.bib` files can be used. The fuzzy-finder is used to look up entry. Package can be used in any scope, so it work fine in any file e.g. LaTeX, Python (like PyLaTeX).

The package requires a bibliography file in the BibTeX system to work properly. This file should be created by the user and then the path to it should be entered in the settings of this package. At the moment the package supports up to 5 bibliography single sources, array of sources and local sources.

If you find entry you want, then you can press:
* `enter` to insert `<key>`
* `alt-enter` to insert `\cite{<key>}`.
* `ctrl-enter` to insert `\cite[]{<key>}`.

Config options `Preserve last search` and `Use alternate scoring` are used from `command-palette` package.


# Example

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
