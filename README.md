# bib-finder

The package help to find and insert bib-entry key to document. Multiple .bib files can be used. The fuzzy-finder is used to look up entry.

The command insert only ID of entry, without any additional text like `\cite{...}` or similar.

Package can be used in any language scope, so it work fine in LaTeX document, python document (e.g. for PyLaTeX package) and more.

![demo-1](demo-1.gif)

# Knowed issues

* bib-parser (@hygull/bibtex) do not work correctly if there is only one entry in file.
* bib-parser (@hygull/bibtex) can not read entry if parameter is multiline.

# See also

* [bacadra-atom](https://github.com/bacadra/bacadra-atom)
* [bib-finder](https://github.com/bacadra/bib-finder)
* [fold-section](https://github.com/bacadra/fold-section)
* [hydrogen-run](https://github.com/bacadra/hydrogen-run)
* [image-paste](https://github.com/bacadra/image-paste)
* [language-bacadra](https://github.com/bacadra/language-bacadra)
* [language-sofistik](https://github.com/bacadra/language-sofistik)
* [navigation-pane](https://github.com/bacadra/navigation-pane)
* [sofistik-atom](https://github.com/bacadra/sofistik-atom)
* [word-map](https://github.com/bacadra/word-map)
