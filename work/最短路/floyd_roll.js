import { Grid } from "#lib/grid";
import { Color } from "#lib/color";
import { Text } from "#lib/text";
import { Util } from "#lib/utility";

let svg = Util.svg();
let pause = Util.pause;
let Loc = Util.Locator;

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
    dist[e[0]][e[1]] = e[2];
    dist[e[1]][e[0]] = e[2];
});

let k = 2;
let row = 400;
let board = new Text(svg, " ");
board.cx(600);
board.cy(260);

let grid_last = new Grid(svg);
grid_last.n(5);
grid_last.m(5);
grid_last.cx(400);
grid_last.cy(row);

let grid_cur = new Grid(svg);
grid_cur.n(5);
grid_cur.m(5);
grid_cur.cx(800);
grid_cur.cy(row);

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        pause(() => {
            board.text(`now[${i+1}][${j+1}]=min(last[${i+1}][${k}]+last[${k}][${j+1}])`, true);
            board.cx(600, true);
            board.cy(260, true);
            grid_cur.color(i, j, Color().green_, true);
            grid_last.color(i, k-1, Color().blue_, true);
            grid_last.color(k-1, j, Color().blue_, true);
        });

        pause(() => {
            grid_cur.default_color(i, j, true);
            grid_last.default_color(i, k-1, true);
            grid_last.default_color(k-1, j, true);
            grid_last.color(i, j, Color().grey_, true);
        });
    }
}