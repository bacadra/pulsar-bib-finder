# bib-finder

The package help to find and insert bib-entry key to document from user files. Multiple .bib files can be used. The fuzzy-finder is used to look up entry.

If you find entry you want, then you can press:
* `enter` to insert `<key>`
* `alt-enter` to insert `\cite{<key>}`.

Package can be used in any scope, so it work fine in any file e.g. LaTeX, Python (like PyLaTeX).

![demo-1](https://github.com/bacadra/bib-finder/blob/master/demo-1.gif?raw=true)

The package requires a bibliography file in the BibTeX system to work properly. This file should be created by the user and then the path to it should be entered in the settings of this package. At the moment the package supports up to 5 bibliography sources, but in case you need more please let me know via github.


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

Save it on the disk and paste absolute path to the file into this package settings, e.g. at `BibTeX source 1`. Then open `command-palette` (default is `ctrl-shift-p`), find command `BiB-Finder:insert-cite`, then lookup for entry you want insert and press `enter` or `alt-enter`.


# Issues

* bib-parser (@hygull/bibtex) do not work correctly if there is only one entry in file.
* bib-parser (@hygull/bibtex) can not read entry if parameter is multiline.
