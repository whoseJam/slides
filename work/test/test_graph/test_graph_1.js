import { Anitype, Util, Text, Graph, Color } from "#lib/slide";

let svg = Util.svg();
let pause = Util.pause;
let pause_append = Util.pause_append;
let A = Anitype.append;
let S = Anitype.start;

let g = new Graph(svg);
let nodes = [
    {value: new Text(g._group, "A0"), id: "A0"},
    {value: new Text(g._group, "A1"), id: "A1"},
    {value: new Text(g._group, "A2"), id: "A2"}
]
let links = [
    {source: "A0", target: "A1"},
    {source: "A1", target: "A2"}
]
g.data(nodes, links);

g.cx(300);
g.cy(300);
pause(() => {
    g.link("A1", "A3");
})
pause(() => {
    g.cx(400);
    g.cy(400);
})