import { Scatter } from "#lib/scatter";
import { Util } from "#lib/utility";
import { Tree } from "#lib/tree";
import { Text } from "#lib/text";
import { Anitype } from "#lib/i_animation";

let pause = Util.pause;
let pause_append = Util.pause_append;

let n = 3;
let p = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let draw = Util.svg();
let scatter = new Scatter(draw);
let tree = new Tree(draw);

function encode_status(p, length) {
    let ans = "[";
    for (let i = 0; i < length; i++) {
        ans = ans + p[i].toString();
        if (i < length - 1) ans = ans + ",";
    } ans = ans + "]";
    return ans;
}

function dfs(dep) {
    if (dep == n) {
        let ans = encode_status(p, dep);
        pause_append(() => { 
            let msg = new Text(draw);
            msg.text(ans);
            scatter.add(msg, Anitype.append);
        });
        return;
    }
    let ans = encode_status(p, dep);
    pause_append(() => { 
        let msg = new Text(draw);
        msg.text(ans);
        scatter.add(msg, Anitype.append); 
    });
    for (let i = 1; i <= n; i++) {
        if (vis[i] === 1) continue;
        vis[i] = 1;
        p[dep] = i;
        dfs(dep + 1);
        vis[i] = 0;
    }
}
scatter.width(400);
scatter.height(200);
scatter.cx(600);
scatter.cy(200);
dfs(0);

p[0] = 2;
vis[2] = 1;
for (let i = 1; i <= n; i++) {
    if (vis[i] === 1) continue;
    p[1] = i;
    let cur = encode_status(p, 1);
    let child = encode_status(p, 2);
    pause(() => {
        tree.link(cur, child, Anitype.start);
    });
}
tree.root("[2]");
tree._depth();
tree.radius(24);
tree.cx(600);
tree.y(400);
tree.height(200);