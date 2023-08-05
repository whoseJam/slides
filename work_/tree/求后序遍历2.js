import { Util } from "#lib/utility";
import { Anitype } from "#lib/i_animation";
import { Array } from "#lib/array";
import { Text } from "#lib/text";
import { Tree } from "#lib/tree";
import { Color } from "#lib/color";
import { Grid } from "#lib/grid";

let pause = Util.pause;
let pause_append = Util.pause_append;
let svg = Util.svg();
const S = Anitype.start;
const A = Anitype.append;

let grid = new Grid(svg);
grid.n(4);
grid.m(8);
grid.value(1, 0, new Text(svg, "字符"));
grid.value(2, 0, new Text(svg, "left"));
grid.value(3, 0, new Text(svg, "right"));
for (let i = 1; i <= 7; i++) {
    grid.value(0, i, new Text(svg, String(i)));
}
grid.x(400);
grid.y(300);
let arr = new Array(svg);
let tr = new Tree(svg);
arr.append(new Text(svg, "A"));
arr.append(new Text(svg, "B"));
arr.append(new Text(svg, "D"));
arr.append(new Text(svg, "."));
arr.append(new Text(svg, "."));
arr.append(new Text(svg, "E"));
arr.append(new Text(svg, "F"));
arr.append(new Text(svg, "."));
arr.append(new Text(svg, "."));
arr.append(new Text(svg, "G"));
arr.append(new Text(svg, "."));
arr.append(new Text(svg, "."));
arr.append(new Text(svg, "C"));
arr.append(new Text(svg, "."));
arr.append(new Text(svg, "."));
arr.y(500);
arr.x(5);
let Arr = ["A","B","D",".",".","E","F",".",".","G",".",".","C",".","."];
tr.root("A");
tr.cx(100);
tr.y(200);
tr.height(250);

let pos = 0;
let cnt = 0;

function build() {
    let pos_ = pos;
    pause(() => {
        if (pos_ >= 1)
            arr.color(pos_-1, Color.default_pack, S);
        arr.color(pos_, Color.green_pack, A);
    })
    if (Arr[pos] !== ".") {
        let grab = ++cnt;
        pause(() => {
            grid.value(1, grab, new Text(svg, Arr[pos_]));
        });
        pos++;
        let lch = build();
        pause(() => {
            grid.value(2, grab, new Text(svg, String(lch)));
        })
        let rch = build();
        pause(() => {
            grid.value(3, grab, new Text(svg, String(rch)));
        })
        return grab;
    } else {
        pos++;
        return ".";
    }
}

build();