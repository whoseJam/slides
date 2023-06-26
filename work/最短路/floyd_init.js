import { Grid } from "#lib/grid";
import { Color } from "#lib/color";
import { Text } from "#lib/text";
import { Util } from "#lib/utility";
import * as d3 from "d3";

let svg = Util.svg();
let pause = Util.pause;
let Loc = Util.locator;

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
for(let i = 0;i < dist.length; i++)
    dist[i] = new Array(6).fill(0);
console.log(dist);

edge.forEach((e) => {
    console.log(e);
    dist[e[0]][e[1]] = e[2];
    dist[e[1]][e[0]] = e[2];
});

let grid = new Grid(svg);
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
        let fn = (svg) => {
            let txt = new Text(svg);
            if (i === j) txt.text("0");
            else if (dist[i+1][j+1] === 0) txt.text("inf");
            else txt.text(dist[i+1][j+1].toString());
        }
        grid.value(i, j, fn);
    }
}