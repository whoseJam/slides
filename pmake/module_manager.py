import os
import hashlib

def read_database(path_to_database: str):
    record = {}
    return record
    try:
        file = open(path_to_database, "r")
        line = file.readline()
        while line:
            strs = line.split(" ")
            filename = strs[0]
            md5 = strs[1]
            record[filename] = md5.strip()
            line = file.readline()
    except:
        pass
    return record

def write_database(path_to_database: str, record: dict):
    file = open(path_to_database, "w")
    for entry, md5 in record.items():
        line = str(entry) + " " + str(md5) + "\n"
        file.write(line)

def npm_run(entry: str, output_path: str, output_file: str):
    cmd = "npm run dev -- --config webpack.config.js --entry {} --output-path {} --output-filename {}".format(
        entry, output_path, output_file)
    os.system(cmd)

def template_html(module: str, path_to_output: str):
    output_path = "{}/{}.html".format(path_to_output, module)
    file = open(output_path, "w", encoding="utf-8")
    file.write("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="{}.js"></script>
    <button onclick="window.continue()">下一条指令</button>
</body>
</html>
""".format(module))
    file.close()

def encode_by_md5(code: str):
    m = hashlib.md5()
    m.update(code.encode())
    return m.hexdigest()

def build_modules(
        modules: str, 
        working_directory: str, 
        path_to_database: str, 
        path_to_output: str):
    record = read_database(path_to_database)
    for module in modules:
        print("building module : {}".format(module))
        path_to_entry = "{}/{}.js".format(working_directory, module)
        output_path = path_to_output
        output_file = "{}.js".format(module)

        current_md5 = encode_by_md5(open(path_to_entry, encoding="utf-8").read())
        if path_to_entry in record.keys():
            last_md5 = record[path_to_entry]
            if last_md5 == current_md5:
                print("module already been built, skip")
                continue

        npm_run(path_to_entry, output_path, output_file)
        template_html(module, path_to_output)
        record[path_to_entry] = current_md5
    
    write_database(path_to_database, record)

