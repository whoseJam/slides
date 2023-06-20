
def replace_css(path):
    file = open(path, "r", encoding="utf-8")
    data = file.read()
    data = data.replace("https://unpkg.com/reveal.js@^4//dist/theme/white.css", "user/white.css")
    file.close()
    file = open(path, "w", encoding="utf-8")
    file.write(data)

def append_configure(path):
    file = open(path, "a")
    file.write("<script src=\"user/update.js\"></script>")
