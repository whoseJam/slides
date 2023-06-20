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
let scatter = new Scatter(draw);
let tree = new Tree(draw);
let animate = true;

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
            let msg = new Message(draw);
            msg.message(ans);
            scatter.add(msg, animate);
        });
        return;
    }
    let ans = encode_status(p, dep);
    pause_append(() => { 
        let msg = new Message(draw);
        msg.message(ans);
        scatter.add(msg, animate); 
    });
    for (let i = 1; i <= n; i++) {
        if (vis[i] === 1) continue;
        vis[i] = 1;
        p[dep] = i;
        dfs(dep + 1);
        vis[i] = 0;
    }
}
scatter.width(600);
scatter.height(300);
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
        tree.link(cur, child, null, true);
        tree.cx(600, true);
        tree.cy(400, true);
    });
}
tree.root("[2]");
tree.radius(24);
tree.line_length(60);
tree.cx(600);
tree.cy(400);