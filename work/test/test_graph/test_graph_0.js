import { Anitype, Util, Text, Graph, Color } from "#lib/slide";

let svg = Util.svg();
let pause = Util.pause;
let pause_append = Util.pause_append;
let A = Anitype.append;
let S = Anitype.start;

let g = new Graph(svg);
let nodes = [
    {value: new Text(g._group, "A0"), id: 0},
    {value: new Text(g._group, "A1"), id: 1},
    {value: new Text(g._group, "A2"), id: 2}
]
let links = [
    {source: 0, target: 1},
    {source: 1, target: 2}
]
g.data(nodes, links);

g.cx(300);
g.cy(300);
pause(() => {
    g.link(2, 3);
})