# bib-finder

The package help to find and insert bib-entry key to document from user files. Multiple .bib files can be used. The fuzzy-finder is used to look up entry.

If you find entry you want, then you can press:
* `enter` to insert `<key>`
* `alt+enter` to insert `\cite{<key>}`.

Package can be used in any scope, so it work fine in any file e.g. LaTeX, Python (like PyLaTeX).

![demo-1](https://github.com/bacadra/bib-finder/blob/master/demo-1.gif?raw=true)


# Issues

* bib-parser (@hygull/bibtex) do not work correctly if there is only one entry in file.
* bib-parser (@hygull/bibtex) can not read entry if parameter is multiline.
