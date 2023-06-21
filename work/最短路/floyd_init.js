import { Grid } from "#lib/grid.js";
import { Color } from "#lib/color.js";
import { SVG } from "@svgdotjs/svg.js";
import { Message } from "#lib/message.js";
import * as H from "#lib/utility.js";

let draw = SVG().addTo("body").size(1200, 600);
let pause = H.pause;
let Loc = H.Locator;

const edge = [
    [1, 5, 5],
    [1, 4, 4],
    [4, 5, 2],
    [4, 2, 1],
    [4, 3, 1],
    [1, 3, 5],
    [3, 2, 3]
];

let dist = new Array(6);
for(let i = 0;i < dist.length; i++) {
    dist[i] = new Array(6).fill(0);
}
console.log(dist);

edge.forEach((e) => {
    console.log(e);
    dist[e[0]][e[1]] = e[2];
    dist[e[1]][e[0]] = e[2];
});

let grid = new Grid(draw);
let loc = Loc("floyd_init");
let l = loc.height() / 5;
grid.element_width(l);
grid.element_height(l);
grid.n(5);
grid.m(5);
grid.cx(600);
grid.y(loc.y());

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        let msg = new Message(draw);
        if (i === j) msg.message("0");
        else if (dist[i+1][j+1] === 0) msg.message("inf");
        else msg.message(dist[i+1][j+1].toString());
        grid.value(i, j, msg);
    }
}