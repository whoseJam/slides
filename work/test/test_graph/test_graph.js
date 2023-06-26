import { Line } from "#lib/line";
import { Util } from "#lib/utility";
import { Anitype } from "#lib/i_animation";
import { Color } from "../../../lib/color";
import { Text } from "#lib/text";
import { Graph } from "#lib/graph";

let svg = Util.svg();
let pause = Util.pause;

const nd = (str) => {
    let fn = (svg) => {
        console.log("create text svg=", svg, "str=", str);
        return new Text(svg, str);
    };
    return fn;
}

let nodes = [
    {value: nd("A0"), id: 0},
    {value: nd("A1"), id: 1},
    {value: nd("A2"), id: 2}
]

let links = [
    {source: 0, target: 1},
    {source: 1, target: 2}
]

let g = new Graph(svg);
g.data(nodes, links);
