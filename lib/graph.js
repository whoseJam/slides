import * as d3 from "d3";
import { Text } from "./text";
import { Line } from "./line";
import { IBox } from "./i_box";
import { Circle } from "./circle";
import { Anitype, IAnimation } from "./i_animation";

/*
node格式: {
    id:int,
    [value]
}
line格式: {
    source:int, 
    target:int,
    [value]
}

实现:
在this._links中存放了
    source: 这条边的起点的各种信息
    target: 这条边的终点的各种信息
    line_handle: 这条边的Line元素
    value_handle: 这条边的value，如果value不存在，该value_handle为null
在this._nodes中存放了
    id: 这个点的id
    node_handle: 这个点的Circle元素
    value_handle: 这个点的value，如果value不存在，该value_handle为null
*/
export class Graph {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._group = svg.append("g");
        this._links_group = this._group.append("g");
        this._nodes_group = this._group.append("g");
        this._origin_links = [];
        this._origin_nodes = [];
        this._links = [];
        this._nodes = [];
        this._x = 0;
        this._y = 0;
        this._height = 100;
        this._width = 100;
        this._radius = 20;
        this._simulation = d3.forceSimulation(this._nodes)
            .force("link", d3.forceLink(this._links).id(data => data.id))
            .force("charge", d3.forceManyBody().strength(-2000))
            .force("center", d3.forceCenter(this.cx(), this.cy()));
    }

    _get_link(start, end) {
        let ans = this._links.filter((link) => {
            return link.source === start && link.target === end;
        });
        if (ans.length === 0) return null;
        return ans;
    }

    _get_origin_link(start, end) {
        let ans = this._origin_links.filter((link) => {
            return link.source === start && link.target === end;
        });
        if (ans.length === 0) return null;
        return ans;
    }

    _get_node(id) {
        let ans = this._nodes.filter((node) => {
            return node.id === id;
        });
        if (ans.length === 0) return null;
        return ans[0];
    }

    _get_origin_node(id) {
        let ans = this._origin_nodes.filter((node) => {
            return node.id === id;
        });
        if (ans.length === 0) return null;
        return ans[0];
    }

    x(new_x) {
        if (typeof(new_x) === "undefined")
            return this._x;
        this._x = new_x;
        this._simulation = this._simulation
            .force("center", d3.forceCenter(this.cx(), this.cy()))
            .restart();
    }

    y(new_y) {
        if (typeof(new_y) === "undefined")
            return this._y;
        this._y = new_y;
        this._simulation = this._simulation
            .force("center", d3.forceCenter(this.cx(), this.cy()))
            .restart();
    }

    height(new_height) {
        if (typeof(new_height) === "undefined")
            return this._height;
        this._height = new_height;
        this._simulation = this._simulation
            .force("center", d3.forceCenter(this.cx(), this.cy()))
            .restart();
    }

    width(new_width) {
        if (typeof(new_width) === "undefined")
            return this._width;
        this._width = new_width;
        this._simulation = this._simulation
            .force("center", d3.forceCenter(this.cx(), this.cy()))
            .restart();
    }

    /**
     * 基于_origin_links，更新_links，添加新增的边，删除消失的边
     */
    _update_link() {
        this._links.forEach((link) => {
            let handle = this._get_origin_link(link.source, link.target);
            if (handle === null) {
                link.line_handle.delete();
                if (link.value_handle !== null)
                    link.value_handle.delete();
            }
        })
        this._origin_links.forEach((link) => {
            let handle = this._get_link(link.source, link.target);
            if (handle === null) {
                handle = {
                    source: link.source,
                    target: link.target,
                    line_handle: new Line(this._links_group),
                    value_handle: link.value ? link.value : null
                };
                this._links.push(handle);
            }
        });
    }

    /**
     * 基于_origin_nodes，更新_nodes，添加新增的点，删除消失的点
     */
    _update_node() {
        this._nodes.forEach((node) => {
            let handle = this._get_origin_node(node.id);
            if (handle === null) {
                if (node.value_handle !== null)
                    node.value_handle.delete();
            }
        })
        this._origin_nodes.forEach((node) => {
            let handle = this._get_node(node.id);
            if (handle === null) {
                handle = {
                    id: node.id,
                    node_handle: new Circle(this._nodes_group),
                    value_handle: node.value ? node.value : null
                };
                this._nodes.push(handle);
            }
        })
    }

    _trim(link) {
        let sx = link.source.x;
        let sy = link.source.y;
        let tx = link.target.x;
        let ty = link.target.y;
        let dx = tx - sx, dy = ty - sy, L = Math.sqrt(dx * dx + dy * dy);
        dx /= L;
        dy /= L;
        return {
            source: {
                x: sx + dx * this._radius,
                y: sy + dy * this._radius
            },
            target: {
                x: tx - dx * this._radius,
                y: ty - dy * this._radius
            }
        };
    }

    /**
     * 自己的_origin_links或者_origin_nodes被修改了，现在对图进行更新
     */
    _update() {
        this._update_link();
        this._update_node();
        console.log(this._nodes);
        this._simulation = this._simulation
            .nodes(this._nodes)
            .force("link", d3.forceLink(this._links).id(data => data.id));
        
        this._simulation = this._simulation.on("tick", () => {
            this._links.forEach((link) => {
                let l = this._trim(link);
                link.line_handle.x1(l.source.x);
                link.line_handle.y1(l.source.y);
                link.line_handle.x2(l.target.x);
                link.line_handle.y2(l.target.y);
            });
            this._nodes.forEach((node) => {
                node.node_handle.cx(node.x);
                node.node_handle.cy(node.y);
                if (node.value_handle !== null) {
                    node.value_handle.cx(node.x);
                    node.value_handle.cy(node.y);
                }
            });
        });
    }

    data(new_nodes, new_links) {
        this._origin_links = new_links;
        this._origin_nodes = new_nodes;
        this._update();
    }

    _check_node(id, value = null) {
        if (this._get_node(id) === null) {
            this._origin_nodes.push({
                id: id,
                value: value ? value : new Text(this._group, String(id))
            });
        }
    }

    _check_line(source, target) {
        if (this._get_link(source, target) === null) {
            this._origin_links.push({
                source: source,
                target: target
            });
        }
    }

    link(source, target) {
        this._check_node(source);
        this._check_node(target);
        this._check_line(source, target);
        this._update();
    }

    node(id, value = null) {
        this._check_node(id, value);
        this._update();
    }
}