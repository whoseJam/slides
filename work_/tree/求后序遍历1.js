import { Util } from "#lib/utility";
import { Anitype } from "#lib/i_animation";
import { Array } from "#lib/array";
import { Text } from "#lib/text";
import { Tree } from "#lib/tree";
import { Color } from "../../lib/color";

let pause = Util.pause;
let pause_append = Util.pause_append;
let svg = Util.svg();

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
let stack = ["A"];
let size = {};
size["A"] = 2;
tr.root("A");
tr.cx(100);
tr.y(200);
tr.height(250);
arr.color(0, Color.blue_pack);

let stk = new Array(svg);
stk.x(5);
stk.y(550);
stk.append(new Text(svg, "A(2)"));

for(let i = 1; i < Arr.length; i++) {
    pause(() => {
        arr.color(i-1, Color.default_pack, Anitype.start);
        arr.color(i, Color.blue_pack, Anitype.append);
    })
    if (Arr[i] !== ".") {
        size[Arr[i]] = 2;
        pause(() => {
            let fa = stack[stack.length - 1]; 
            tr.link(fa, Arr[i], Anitype.start);
            stk.remove(stack.length - 1);
            size[fa]--;
            stk.append(new Text(svg, fa + "(" + String(size[fa]) + ")"));
            stack.push(Arr[i]);
            stk.append(new Text(svg, Arr[i] + "(" + String(2) + ")"), Anitype.start);
        });
    } else {
        pause(() => {
            let fa = stack[stack.length - 1];
            stk.remove(stack.length - 1);
            size[fa]--;
            stk.append(new Text(svg, fa + "(" + String(size[fa]) + ")"));
            while(size[fa] == 0) {
                stk.remove(stack.length - 1);
                stack.pop();
                fa = stack[stack.length - 1];
            }
        });
    }
}