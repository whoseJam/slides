import * as d3 from "d3";
import { Text } from "./text";
import { Util } from "./utility";
import { Anitype } from "./i_animation";
import { FixBox } from "./box";
import { Array } from "./array";
import { Tree } from "./tree";
import { Color } from "./color";
import { Circle } from "./circle";
import { Rect } from "./rect";

let pause = Util.pause;
let file = await d3.csv("temp.csv");
let dates = file.map(value => value.date);
let temps = file.map(value => value.temperature);

let fruits = [
    {name: "🍊", count: 21},
    {name: "🍇", count: 13},
    {name: "🍏", count: 8},
    {name: "🍌", count: 5},
    {name: "🍐", count: 3},
    {name: "🍋", count: 2},
    {name: "🍎", count: 1},
    {name: "🍉", count: 1}
];

let width = 100;

let x = d3.scaleLinear()
    .domain([0, d3.max(fruits, fruit => fruit.count)])
    .range([10, 90])
    .interpolate(d3.interpolateRound);
let y = d3.scaleBand()
    .domain(fruits.map(d => d.name))
    .range([10, 90])
    .padding(0.1)
    .round(true);


let svg = d3.select("body")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 600);


let txt = svg.append("text")
    .text("Hello")
    .attr("text-anchor", "start")
    .attr("dy", ".71em")
    .attr("x", 0)
    .attr("y", 0)
    .attr("font-size", 15)
    .attr("font-family", "consolas")

let cir = new Circle(svg);
console.log(cir.x(), cir.y(), cir.radius());
let rct = new Rect(svg);
console.log(rct.width(), rct.height());
pause(() => {
    cir.x(100, Anitype.start);
    cir.y(100, Anitype.append);
    cir.radius(200, Anitype.append);
    rct.x(200, Anitype.start);
    rct.y(100, Anitype.append);
    rct.stroke_opacity(0.5, Anitype.start);
    rct.opacity(0.1, Anitype.start);
})

// let data = [
//     {"name": "Eve",   "parent": "" },
//     {"name": "Cain",  "parent": "Eve"},
//     {"name": "Seth",  "parent": "Eve"},
//     {"name": "Enos",  "parent": "Seth"},
//     {"name": "Noam",  "parent": "Seth"},
//     {"name": "Abel",  "parent": "Eve"},
//     {"name": "Awan",  "parent": "Eve"},
//     {"name": "Enoch", "parent": "Awan"},
//     {"name": "Azura", "parent": "Eve"},
// ];
// data.forEach((item) => {
//     item.value = () => {
//         let tmp = new Text(svg, item.name);
//         return tmp;
//     };
// });
// let tr = new Tree(svg);
// let tp = Anitype.append;
// tr.plain_data(data, "name", "parent");
// pause(() => {
//     tr.append_plain_data(
//         {"name": "HSJ", "parent": "Awan", "value": () => { return new Text(svg, "HSJ"); }},
//         Anitype.start);
//     tr.append_plain_data(
//         {"name": "SSS", "parent": "Azura", "value": () => { return new Text(svg, "FFF"); }},
//         Anitype.append);
//     tr.color_all(Color.blue_pack, Anitype.start);
// });
// pause(() => {
//     tr.append_plain_data(
//         {"name": "SSS", "parent": "Azura", "value": () => { return new Text(svg, "HSJ"); }},
//         Anitype.start);
// });
// pause(() => {
//     tr.color_all(Color.blue_pack, Anitype.start);
// })