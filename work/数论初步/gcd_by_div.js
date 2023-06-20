import { Array } from "#lib/array.js";
import { Grid } from "#lib/grid.js";
import { Message } from "#lib/message.js";
import { Stack } from "#lib/stack.js";
import { pause } from "#lib/utility.js";
import { SVG } from "@svgdotjs/svg.js";

let draw = SVG().addTo("body").size(1200, 600);

let v = [15, 2];
let arr = new Array(draw);
arr.element_height(1000);
for (let i = 0; i <= 1; i++) {
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
arr.y(570);

function div() {
    let last_key = 0;
    let cur_key = 1;
    if (v[last_key] > v[cur_key]) {
        v[last_key] -= v[cur_key];
        for (let i = 1; i <= v[cur_key]; i++)
            arr.value(last_key).pop(true);
    } else {
        v[cur_key] -= v[last_key];
        for (let i = 1; i <= v[last_key]; i++)
            arr.value(cur_key).pop(true);
    }
}

pause(() => { div(); });
pause(() => { div(); });
pause(() => { div(); });
pause(() => { div(); });
pause(() => { div(); });
pause(() => { div(); });
pause(() => { div(); });
pause(() => { div(); });
pause(() => { div(); });
pause(() => { div(); });