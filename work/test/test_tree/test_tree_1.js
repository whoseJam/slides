import { Text } from "#lib/text";
import { Scatter } from "#lib/scatter";
import { Util } from "#lib/utility";
import { Tree } from "#lib/tree";
import { Color } from "#lib/color";
import { Anitype } from "#lib/i_animation";

let pause = Util.pause;
let pause_append = Util.pause_append;

let draw = Util.svg();

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
        let msg = new Text(draw);
        msg.text(keywords[i]);
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

tree.width(1000);

tree.root("Arad");
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

tree.radius(25);
tree.cx(600);
tree.cy(400);
pause(() => {
    tree.color("Arad", Color.blue_pack, Anitype.start);
});
pause(() => {
    tree.color("Sibiu", Color.grey_pack, Anitype.start);
    tree.color("Timisoara", Color.grey_pack, Anitype.start);
    tree.color("Zerind", Color.grey_pack, Anitype.start);
});
pause(() => {
    tree.color("Sibiu", Color.blue_pack, Anitype.start);
});
pause(() => {
    tree.color("Arad_", Color.grey_pack, Anitype.start);
    tree.color("Fagaras", Color.grey_pack, Anitype.start);
    tree.color("Oradea", Color.grey_pack, Anitype.start);
    tree.color("Rimnicu Vllcea", Color.grey_pack, Anitype.start);
});