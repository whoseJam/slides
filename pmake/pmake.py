import sys
import os
import html_process
import md_process
import module_manager

PATH_TO_SLIDES = "C:/Users/27670/Project/Slides"

if __name__=="__main__":
    path_to_reveal_math = "{}/reveal/plugin/math/math.js".format(PATH_TO_SLIDES)
    path_to_user_css = "{}/user/user.css".format(PATH_TO_SLIDES)
    path_to_output_md = "{}/build/output.md".format(PATH_TO_SLIDES)
    path_to_current_md = "{}/{}".format(PATH_TO_SLIDES, sys.argv[1])
    path_to_output_html = "{}/build/output.html".format(PATH_TO_SLIDES)
    path_to_module_database = "{}/build/module.cache".format(PATH_TO_SLIDES)

    output_md = open(path_to_output_md, "w", encoding="utf-8")
    current_md = open(path_to_current_md, "r", encoding="utf-8")
    title = path_to_current_md.split("/")[-1]
    title = title.split(".")[0]
    author = sys.argv[2]

    print("title : {}".format(title))
    print("author : {}".format(author))
    md_process.write_configure(title, author, output_md)
    md_process.append(output_md, current_md)
    output_md.close()
    current_md.close()

    os.system("pandoc {} -o {} -t revealjs -s --katex -V theme=white".format(path_to_output_md, path_to_output_html))

    modules = md_process.get_modules(path_to_current_md)
    module_manager.build_modules(
        modules, 
        os.path.dirname(path_to_current_md),
        path_to_module_database,
        "{}/build".format(PATH_TO_SLIDES))
    html_process.append_configure(path_to_output_html)
    html_process.replace_css(path_to_output_html)
