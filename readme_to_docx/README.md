
# Pandoc – Simple Usage Guide

Pandoc is a document converter. This guide shows **how to install** and **how to convert files**.

---

## Installation

### Windows

1. Download Pandoc installer from the official site
2. Run the `.msi` file
3. Finish installation
4. Restart Command Prompt / PowerShell

Check installation:

```bash
pandoc --version
```

---

### Linux (Ubuntu / Debian)

```bash
sudo apt update
sudo apt install pandoc
```

---

### macOS

```bash
brew install pandoc
```

---

## Basic Usage

General command:

```bash
pandoc input_file -o output_file
```

---

## Common Examples

### Markdown → Word

```bash
pandoc README.md -o README.docx
```

### Markdown → PDF

```bash
pandoc README.md -o README.pdf
```

### Markdown → HTML

```bash
pandoc README.md -o README.html
```

### Multiple Markdown Files → One DOCX

```bash
pandoc file1.md file2.md file3.md -o output.docx
```

---

## Custom Word Formatting (Optional)

```bash
pandoc README.md -o README.docx --reference-doc=template.docx
```

---

## Notes

- Use correct Markdown syntax
- For PDF, LaTeX must be installed
- Restart terminal if Pandoc is not detected

---
