# bib-finder

The package help to find and insert bib-entry key to document. Multiple .bib files can be used. The fuzzy-finder is used to look up entry.

The command insert only ID of entry, without any additional text like `\cite{...}` or similar.

Package can be used in any language scope, so it work fine in LaTeX document, python document (e.g. for PyLaTeX package) and more.

![demo-1](demo-1.gif)


# Knowed issues

* bib-parser (@hygull/bibtex) do not work correctly if there is only one entry in file.
* bib-parser (@hygull/bibtex) can not read entry if parameter is multiline.
