import { Array } from "#lib/array.js";
import { Grid } from "#lib/grid.js";
import { Message } from "#lib/message.js";
import { Stack } from "#lib/stack.js";
import { pause } from "#lib/utility.js";
import { SVG } from "@svgdotjs/svg.js";

let draw = SVG().addTo("body").size(1200, 600);

let v = [5, 3, 2, 2, 4];
let arr = new Array(draw);
arr.element_height(1000);
for (let i = 0; i <= 4; i++) {
    let stack = new Stack(draw);
    for (let j = 1; j <= v[i]; j++) {
        let msg = new Message(draw);
        msg.message("GCD");
        stack.push(msg);
    }
    arr.append(stack);
}

arr.layout("top");
arr.show_boundary(false);
arr.cx(600);
arr.y(470);

let last_key = null;
document.addEventListener("keydown", keydown);
function keydown(event) {
    if (48 <= event.keyCode && event.keyCode <= 52) {
        let cur_key = event.keyCode - 48;
        if (last_key === null) last_key = cur_key;
        else {
            if (v[last_key] > v[cur_key]) {
                v[last_key] -= v[cur_key];
                for (let i = 1; i <= v[cur_key]; i++)
                    arr.value(last_key).pop(true);
            } else {
                v[cur_key] -= v[last_key];
                for (let i = 1; i <= v[last_key]; i++)
                    arr.value(cur_key).pop(true);
            }
            last_key = null;
        }
    }
}