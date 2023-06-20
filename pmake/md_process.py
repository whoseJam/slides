import re

def write_configure(title, author, wfile):
    wfile.write("""
---
author: {}
title: {}
header-includes: 
    <link rel="stylesheet" href="user/user.css">
    <script src="reveal/plugin/math/math.js"></script>
---
""".format(author, title))

def get_modules(path):
    modules = []
    file = open(path, "r", encoding="utf-8")
    line = file.readline()
    while line:
        pat = re.compile("data-background-iframe=\"(.*?)\"")
        mat = pat.search(line)
        if mat is not None:
            module = mat.group(1)
            modules.append(module)
        line = file.readline()
    return modules

def append(wfile, rfile):
    line = rfile.readline()
    while line:
        pat = re.compile("data-background-iframe=\"(.*?)\"")
        mat = pat.search(line)
        if mat is not None:
            module = "data-background-iframe=\"" + mat.group(1) + "\""
            module_html = "data-background-iframe=\"{}.html\"".format(mat.group(1))
            line = line.replace(module, module_html)
        wfile.write(line)
        line = rfile.readline()
