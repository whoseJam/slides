import { Message } from "#lib/message.js";
import { Scatter } from "#lib/scatter.js";
import { pause, pause_append } from "#lib/utility.js";
import { Tree } from "#lib/tree.js";
import { SVG } from "@svgdotjs/svg.js";
import { Vertex } from "../../lib/vertex";


let draw = SVG().addTo("body").size(1200, 600);

let tree = new Tree(draw);
let scatter = new Scatter(draw);
scatter.cx(900);
scatter.cy(164);
let keywords = [
    "状态",
    "状态空间",
    "开始状态",
    "结束状态",
    "后继",
    "搜索图",
    "搜索树"
];

for (let i = 0; i < keywords.length; i++) {
    pause(() => {
        let msg = new Message(draw);
        msg.message(keywords[i]);
        scatter.add(msg, true);
    });
}

let key_value_pair = [
    ["Arad", "Arad"],
    ["Arad_", "Arad"],
    ["Arad__", "Arad"],
    ["Arad___", "Arad"],
    ["Oradea", "Oradea"],
    ["Oradea_", "Oradea"],
    ["Sibiu", "Sibiu"],
    ["Fagaras", "Fagaras"],
    ["Rimnicu Vllcea", "Rimnicu Vllcea"],
    ["Timisoara", "Timisoara"],
    ["Lugoj", "Lugoj"],
    ["Zerind", "Zerind"]
];

for (let i = 0; i < key_value_pair.length; i++) {
    let new_node = new Vertex(draw);
    let new_msg = new Message(draw);
    new_msg.message(key_value_pair[i][1]);
    new_node.value(new_msg);
    tree.new_node(key_value_pair[i][0], new_node);
}

tree.link("Arad", "Sibiu");
tree.link("Arad", "Timisoara");
tree.link("Arad", "Zerind");
tree.link("Sibiu", "Arad_");
tree.link("Sibiu", "Fagaras");
tree.link("Sibiu", "Oradea");
tree.link("Sibiu", "Rimnicu Vllcea");
tree.link("Timisoara", "Arad__");
tree.link("Timisoara", "Lugoj");
tree.link("Zerind", "Arad___");
tree.link("Zerind", "Oradea_");
tree.root("Arad");
tree.radius(25);
tree.line_length(80);
tree.cx(600);
tree.cy(400);
tree.opacity(0);
pause(() => {
    tree.opacity(1, true);
})
pause(() => {
    tree.blue("Arad", true);
});
pause(() => {
    tree.grey("Sibiu", true);
    tree.grey("Timisoara", true);
    tree.grey("Zerind", true);
});
pause(() => {
    tree.blue("Sibiu", true);
});
pause(() => {
    tree.grey("Arad_", true);
    tree.grey("Fagaras", true);
    tree.grey("Oradea", true);
    tree.grey("Rimnicu Vllcea", true);
});