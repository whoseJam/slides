import { Grid } from "#lib/grid";
import { Util } from "#lib/utility";
import { Text } from "#lib/text";
import { Color } from "../../../lib/color";
import { Anitype } from "../../../lib/i_animation";

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

let t_px = 5;
let t_py = 3;
let n = 6;
let vis = create_2d(n, n);
let dis = create_2d(n, n);
let grid = new Grid(svg);
grid.n(n);
grid.m(n);
grid.value(0, 0, new Text(svg, "S"));
grid.value(t_px, t_py, new Text(svg, "T"));
grid.cx(300);
grid.cy(300);

let queue = [];
let head = 0;
let tail = -1;

queue.push([0, 0]);
vis[0][0] = 1;
pause(() => {
    grid.color(0, 0, Color.blue_pack);
})
tail++;

let dx = [1, 0, -1, 0, 2, 2, -2, -2];
let dy = [0, 1, 0, -1, 2, -2, 2, -2];

while(head <= tail) {
    let u = queue[head];
    head++;
    pause(() => {
        grid.color(u[0], u[1], Color.green_pack, Anitype.start);
    });
    for (let i = 0; i < 8; i++) {
        let v = [u[0] + dx[i], u[1] + dy[i]];
        if (!(0 <= v[0] && v[0] < n && 0 <= v[1] && v[1] < n)) continue;
        if (vis[v[0]][v[1]]) continue;
        vis[v[0]][v[1]] = 1;
        pause(() => {
            grid.color(v[0], v[1], Color.blue_pack, Anitype.start);
        });
        tail++;
        dis[v[0]][v[1]] = dis[u[0]][u[1]] + 1;
        pause_append(() => {
            grid.value(v[0], v[1], new Text(svg, String(dis[v[0]][v[1]])));
        })
        queue.push(v);
    }
    pause(() => {
        grid.color(u[0], u[1], Color.grey_pack, Anitype.start);
    })
}