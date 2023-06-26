import * as d3 from "d3";
import { Line } from "./line";
import { IBox } from "./i_box";
import { Circle } from "./circle";
import { Anitype, IAnimation } from "./i_animation";

/*
node格式:
{
    id:int,
    value:callback
}
line格式:
{
    source:int, 
    target:int,
    value:callback
}
*/
export class Graph {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._group = svg.append("g");
        this._links_group = this._group.append("g");
        this._nodes_group = this._group.append("g");
        this._link_contents_group = this._group.append("g");
        this._node_contents_group = this._group.append("g");
        this._links = [];
        this._nodes = [];
        this._x = 0;
        this._y = 0;
        this._height = 100;
        this._width = 100;
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined")
            return this._x;
        this._x = new_x;
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined")
            return this._y;
        this._y = new_y;
    }

    height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined")
            return this._height;
        this._height = new_height;
    }

    width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this._width;
        this._width = new_width;
    }

    data(new_nodes, new_links, animate = Anitype.none) {
        this._links = new_links;
        this._nodes = new_nodes;
        let simulation = d3.forceSimulation(this._nodes)
            .force("link", d3.forceLink(this._links).id(data => data.id))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force("center", d3.forceCenter(this.cx(), this.cy()));
        
        let links_group = this._links_group.selectAll("*").data(this._links);
        links_group.enter().each((data) => {
            data.line = new Line(this._links_group);
        });
        let link_contents_group = this._link_contents_group.selectAll("*").data(this._links);
        link_contents_group.enter().each((data) => {
            if (typeof(data.value) === "function") {
                data.value = data.value(this._link_contents_group);
            }
        });
        console.log(this._nodes);
        let nodes_group = this._nodes_group.selectAll("*").data(this._nodes);
        nodes_group.enter().each((data) => {
            data.node = new Circle(this._nodes_group);
        })
        let node_contents_group = this._node_contents_group.selectAll("*").data(this._nodes);
        node_contents_group.enter().each((data) => {
            if (typeof(data.value) === "function") {
                data.value = data.value(this._node_contents_group);
            }
            console.log(data.value);
        });
        

        simulation.on("tick", () => {
            let nodes = this._nodes_group.selectAll("*").data(this._nodes);
            nodes.each((data) => {
                data.node.cx(data.x);
                data.node.cy(data.y);
            });
            let node_contents = this._node_contents_group.selectAll("*").data(this._nodes);
            node_contents.each((data) => {
                data.value.cx(data.x);
                data.value.cy(data.y + 3);
            });
            let links = this._links_group.selectAll("*").data(this._links);
            links.each((data) => {
                data.line.x1(data.source.x);
                data.line.y1(data.source.y);
                data.line.x2(data.target.x);
                data.line.y2(data.target.y);
            });
            let link_contents = this._link_contents_group.selectAll("*").data(this._links);
            link_contents.each((data) => {
                if (data.value) {
                    data.value.cx(data.line.cx());
                    data.value.cy(data.line.cy());
                }
            })
        });
    }
}