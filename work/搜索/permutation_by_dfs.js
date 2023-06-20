import { Message } from "#lib/message.js";
import { Scatter } from "#lib/scatter.js";
import { pause, pause_append } from "#lib/utility.js";
import { Tree } from "#lib/tree.js";
import { SVG } from "@svgdotjs/svg.js";
import { Vertex } from "../../lib/vertex";


let n = 3;
let p = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let vis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let draw = SVG().addTo("body").size(1200, 600);
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
        pause(() => { tree.green(cur, true); });
        return;
    }
    let cur = encode_status(p, dep);
    pause(() => { tree.blue(cur, true); });
    for (let i = 1; i <= n; i++) {
        if (vis[i] === 1) continue;
        p[dep] = i;
        let nxt = encode_status(p, dep + 1);
        pause_append(() => { tree.grey(nxt, true); });
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
    if (parent != null) e = tree.edge(parent, cur);
    if (dep == n) {
        pause(() => { 
            tree.blue(cur, true);
            if (e != null) e.red(true);
        });
        pause(() => {
            tree.grey(cur, true);
            if (e != null) e.default_color(true);
        });
        return;
    }
    pause(() => { 
        tree.blue(cur, true);
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
        tree.grey(cur, true);
        if (e != null) e.default_color(true);
    });
}

dfs(0);

tree.root("[]");
tree.radius(24);
tree.line_length(60);
tree.cx(600);
tree.cy(300);

pause(() => { tree.default_color(undefined, true); });
dfs2(0);
