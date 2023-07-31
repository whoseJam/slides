import { Grid } from "#lib/grid";
import { Util } from "#lib/utility";
import { Text } from "#lib/text";
import { Color } from "#lib/color";
import { Anitype } from "#lib/i_animation";

let pause = Util.pause;
let pause_append = Util.pause_append;
let svg = Util.svg();

const create_1d = (n) => {
    let ans = [];
    for (let i = 1; i <= n; i++) ans.push(0);
    return ans;
}

const create_2d = (n, m) => {
    let ans = [];
    for (let i = 1; i <= n; i++)
        ans.push(create_1d(m));
    return ans;
}

let start = 5;
let target = 17;
let n = 20;
let dis = create_1d(n);
let vis = create_1d(n);
let grid = new Grid(svg);
// let floor = new Grid(svg);
grid.n(2);
grid.m(n);
grid.element_width(50);
grid.element_height(50);
grid.value(0, start, new Text(svg, "Start"));
grid.value(0, target, new Text(svg, "Target"));
grid.x(1);
grid.cy(300);
// floor.x(grid.mx() + 2);
// floor.y(grid.y());

let queue = [];
let head = 0;
let tail = -1;

queue.push(start);
vis[start] = 1;
pause(() => {
    grid.color(0, start, Color.blue_pack);
})
tail++;

let trans = [x => x - 1, x => x + 1, x => x * 2];

for (let i = 0; i < n; i++) {
    let txt = new Text(svg, String(i));
    grid.value(1, i, txt);
}

while(head <= tail) {
    let u = queue[head];
    head++;
    pause(() => {
        grid.color(0, u, Color.green_pack, Anitype.start);
    });
    for (let i = 0; i < 3; i++) {
        let v = trans[i](u);
        if (!(0 <= v && v < n)) continue;
        if (vis[v]) continue;
        vis[v] = 1;
        pause(() => {
            grid.color(0, v, Color.blue_pack, Anitype.start);
        });
        tail++;
        vis[v] = 1;
        dis[v] = dis[u] + 1;
        pause_append(() => {
            grid.value(0, v, new Text(svg, String(dis[v])));
        })
        queue.push(v);
    }
    pause(() => {
        grid.color(0, u, Color.grey_pack, Anitype.start);
    })
}