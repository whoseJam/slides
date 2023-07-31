
import { Scatter } from "#lib/scatter.js";
import { Util } from "#lib/utility.js";
import { Tree } from "#lib/tree.js";
import { Color } from "#lib/color";
import { Anitype } from "#lib/i_animation";

let pause = Util.pause;
let pause_append = Util.pause_append;

let n = 3;
let p = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let draw = Util.svg();
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
        let cur = encode_status(p, dep);
        pause(() => { tree.color(cur, Color.green_pack, Anitype.start); });
        return;
    }
    let cur = encode_status(p, dep);
    pause(() => { tree.color(cur, Color.blue_pack, Anitype.start); });
    for (let i = 1; i <= n; i++) {
        if (vis[i] === 1) continue;
        p[dep] = i;
        let nxt = encode_status(p, dep + 1);
        pause_append(() => { tree.color(nxt, Color.grey, Anitype.start); });
    }
    for (let i = 1; i <= n; i++) {
        if (vis[i] === 1) continue;
        vis[i] = 1;
        p[dep] = i;
        let nxt = encode_status(p, dep + 1);
        tree.link(cur, nxt);
        dfs(dep + 1);
        vis[i] = 0;
    }
}

function dfs2(dep, parent = null) {
    let cur = encode_status(p, dep);
    let e = null;
    // if (parent != null) e = tree.edge(parent, cur);
    if (dep == n) {
        pause(() => { 
            tree.color(cur, Color.blue_pack, Anitype.start);
            if (e != null) e.red(Anitype.start);
        });
        pause(() => {
            tree.grey(cur, true);
            if (e != null) e.default_color(Anitype.start);
        });
        return;
    }
    pause(() => { 
        tree.color(cur, Color.blue_pack, Anitype.start);
        if (e != null) e.red(true);
    });
    for (let i = 1; i <= n; i++) {
        if (vis[i] === 1) continue;
        vis[i] = 1;
        p[dep] = i;
        dfs2(dep + 1, cur);
        vis[i] = 0;
    }
    pause(() => {
        tree.color(cur, Color.grey_pack, Anitype.start);
        if (e != null) e.default_color(Anitype.start);
    });
}

tree.root("[]");
tree.radius(24);
tree.height(1200);
tree.cx(600);
tree.y(100);

dfs(0);

pause(() => { tree.color_all(Color.default_pack, Anitype.start); });
dfs2(0);
