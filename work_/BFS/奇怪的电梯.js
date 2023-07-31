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

let start = 1;
let target = 7;
let n = 10;
let dis = create_1d(n);
let vis = create_1d(n);
let grid = new Grid(svg);
// let floor = new Grid(svg);
grid.n(n);
grid.m(2);
grid.element_width(100);
grid.element_height(50);
grid.value(start, 0, new Text(svg, "Start"));
grid.value(target, 0, new Text(svg, "Target"));
grid.cx(300);
grid.cy(300);
// floor.x(grid.mx() + 2);
// floor.y(grid.y());

let queue = [];
let head = 0;
let tail = -1;

queue.push(start);
vis[start] = 1;
pause(() => {
    grid.color(start, 0, Color.blue_pack);
})
tail++;

let a = [3, 3, 1, 2, 5, 1, 3, 2, 5, 1];
let dx = [1, -1];

for (let i = 0; i < n; i++) {
    let txt = new Text(svg, String(a[i]));
    grid.value(i, 1, txt);
}

while(head <= tail) {
    let u = queue[head];
    head++;
    pause(() => {
        grid.color(u, 0, Color.green_pack, Anitype.start);
    });
    for (let i = 0; i < 2; i++) {
        let v = u + dx[i] * a[u];
        if (!(0 <= v && v < n)) continue;
        if (vis[v]) continue;
        vis[v] = 1;
        pause(() => {
            grid.color(v, 0, Color.blue_pack, Anitype.start);
        });
        tail++;
        vis[v] = 1;
        dis[v] = dis[u] + 1;
        pause_append(() => {
            grid.value(v, 0, new Text(svg, String(dis[v])));
        })
        queue.push(v);
    }
    pause(() => {
        grid.color(u, 0, Color.grey_pack, Anitype.start);
    })
}