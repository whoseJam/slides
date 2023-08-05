import * as d3 from "d3";
import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";
import { Color } from "./color";
import { Util } from "./utility";
import { Text } from "./text";
import { Line } from "./line";
import { Circle } from "./circle";

/**
 * Tree里面的节点元素被存储在_nodes里面，包括：
 *   - id: 这个点的id
 *   - parent: 这个点的父节点id
 *   - node_handle: 这个点的Circle元素
 *   - value_handle: 这个点的value，如果value不存在，该value_handle为null
 * 
 * Tree里面的边元素被存储在_lines里面，包括
 *   - id: 这个点的id
 *   - parent: 这个点的父节点id
 *   - line_handle: 这个点的父节点到这个点的连边Line元素
 *   - value_handle: 这个边的value，如果value不存在，该value_handle为null
 */
export class Tree {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._rate = 1.2;
        this._radius = 20;
        this._group = svg.append("g");
        this._lines_group = this._group.append("g");
        this._nodes_group = this._group.append("g");
        this._origin_data = [];
        this._root = null;
        this._hierarchy = null;
        this._tree_info = null;
        this._nodes = [];
        this._lines = [];
        this._tree = d3.tree().size([300, 300]);
        this._x = 0;
        this._y = 0;
        this._width = 300;
        this._height = 300;
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined")
            return this._x;
        this._x = new_x;
        if (this._tree_info) this._update_tree(animate);
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined")
            return this._y;
        this._y = new_y;
        if (this._tree_info) this._update_tree(animate);
    }

    width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this._width;
        this._width = new_width;
        this._tree = this._tree.size([this.width(), this.height()]);
        if (this._tree_info) this._update_tree(animate);
    }

    height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined")
            return this._height;
        this._height = new_height;
        this._tree = this._tree.size([this.width(), this.height()]);
        if (this._tree_info) this._update_tree(animate);
    }
    
    _get_node(id) {
        let ans = this._nodes.filter((node) => {
            return node.id === id;
        });
        if (ans.length === 0) return null;
        return ans[0];
    }

    _get_line(parent, child) {
        let ans = this._lines.filter((line) => {
            return line.parent === parent && line.id === child;
        });
        if (ans.length === 0) return null;
        return ans[0];
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

    _update_node(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        this._tree_info.descendants().forEach((node) => {
            let handle = this._get_node(node.data.id);
            if (handle === null) {
                let node_handle = new Circle(this._nodes_group);
                node_handle.radius(this._radius);
                node_handle.fill(Color.white);
                node_handle.fill_opacity(1);
                node_handle.stroke(Color.white);
                node_handle.stroke_opacity(1);
                node_handle.cx(node.x + this.x());
                node_handle.cy(node.y + this.y());
                node_handle.stroke_opacity(1, mng.fir_status());
                handle = {
                    parent: node.data.parent,
                    id: node.data.id,
                    node_handle: node_handle,
                    value_handle: node.data.data.value ? node.data.data.value : null
                };
                if (handle.value_handle) {
                    console.log(handle.value_handle);
                    handle.value_handle.cx(node.x + this.x());
                    handle.value_handle.cy(node.y + this.y());
                }
                this._nodes.push(handle);
            } else {
                handle.node_handle.cx(node.x + this.x(), mng.fir_status());
                handle.node_handle.cy(node.y + this.y(), mng.sec_status());
                handle.value_handle.cx(node.x + this.x(), mng.fir_status());
                handle.value_handle.cy(node.y + this.y(), mng.sec_status());
            }
        })
    }

    _update_line(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        this._tree_info.links().forEach((link) => {
            let l = this._trim(link);
            let handle = this._get_line(link.source.data.id, link.target.data.id);
            if (handle === null) {
                let line_handle = new Line(this._lines_group);
                line_handle.x1(l.source.x + this.x());
                line_handle.y1(l.source.y + this.y());
                line_handle.x2(l.target.x + this.x());
                line_handle.y2(l.target.y + this.y());
                handle = {
                    parent: link.source.data.id,
                    id: link.target.data.id,
                    line_handle: line_handle,
                    value_handle: null,
                }
                this._lines.push(handle);
            } else {
                handle.line_handle.x1(l.source.x + this.x(), mng.fir_status());
                handle.line_handle.y1(l.source.y + this.y(), mng.sec_status());
                handle.line_handle.x2(l.target.x + this.x(), mng.sec_status());
                handle.line_handle.y2(l.target.y + this.y(), mng.sec_status());
            }
        });
    }

    _update_tree(animate = Anitype.none) {
        this._update_node(animate);
        console.log(this._nodes);
        this._update_line(animate);
        console.log(this._lines);
    }

    data(new_data, animate = Anitype.none) {
        if (typeof(new_data) === "undefined")
            return this._plain_data;
        this._origin_data = new_data;
        this._root = d3.stratify()
            .id(d => d["id"])
            .parentId(d => d["parent"])
            (this._origin_data);
        this._hierarchy = d3.hierarchy(this._root);
        this._tree_info = this._tree(this._hierarchy);
        this._update_tree(animate);
    }

    append_data(new_record, animate = Anitype.none) {
        this._origin_data.push(new_record);
        this._root = d3.stratify()
            .id(d => d["id"])
            .parentId(d => d["parent"])
            (this._origin_data);
        this._hierarchy = d3.hierarchy(this._root);
        this._tree_info = this._tree(this._hierarchy);
        this._update_tree(animate);
    }

    link(parent, child, animate = Anitype.none) {
        let item = {};
        item["parent"] = parent;
        item["id"] = child;
        item["value"] = new Text(this._group, child);
        this.append_data(item, animate);
    }

    root(root, animate = Anitype.none) {
        let item = {};
        item["parent"] = "";
        item["id"] = root;
        item["value"] = new Text(this._group, root);
        this.append_data(item, animate);
    }

    radius(new_radius, animate = Anitype.none) {
        if (typeof(new_radius) === "undefined")
            return this._radius;
        this._radius = new_radius;
        let mng = this._animation_status(animate);
        this._tree_info.descendants().forEach((node) => {
            let handle = this._get_node(node.data.id);
            handle.node_handle.radius(this._radius, mng.fir_status());
        });
        this._tree_info.links().forEach((line) => {
            let l = this._trim(line);
            let handle = this._get_line(line.source.data.id, line.target.data.id);
            handle.line_handle.x1(l.source.x + this.x(), mng.fir_status());
            handle.line_handle.y1(l.source.y + this.y(), mng.sec_status());
            handle.line_handle.x2(l.target.x + this.x(), mng.sec_status());
            handle.line_handle.y2(l.target.y + this.y(), mng.sec_status());
        });
    }

    color_all(new_color_pack, animate = Anitype.none) {
        if (typeof(new_color_pack) === "undefined")
            return this._color;
        this._color = new_color_pack;
        let mng = this._animation_status(animate);
        this._tree_info.descendants().forEach((node) => {
            let handle = this._get_node(node.data.id);
            handle.node_handle.fill(new_color_pack.main, mng.fir_status());
            handle.node_handle.fill_opacity(1, mng.sec_status());
            handle.node_handle.stroke(new_color_pack.border, mng.sec_status());
            handle.node_handle.stroke_opacity(1, mng.sec_status());
        });
    }

    color(id, new_color_pack, animate = Anitype.none) {
        if (typeof(new_color_pack) === "undefined")
            return this._color;
        let mng = this._animation_status(animate);
        let handle = this._get_node(id);
        handle.node_handle.fill(new_color_pack.main, mng.fir_status());
        handle.node_handle.fill_opacity(1, mng.sec_status());
        handle.node_handle.stroke(new_color_pack.border, mng.sec_status());
        handle.node_handle.stroke_opacity(1, mng.sec_status());
    }

    rate(new_rate, animate = Anitype.none) {
        if (typeof(new_rate) === "undefined")
            return this._rate;
        this._rate = new_rate;
        this.update_content_size(animate);
    }

    update_content_size(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        this._tree_info.descendants().forEach((node) => {
            let handle = this._get_node(node.data.id);
            let value = handle.value_handle;
            if (value.width() > value.height()) value.width(this.radius() * 2 / this.rate(), mng.fir_status());
            else value.height(this.radius() * 2 / this.rate(), mng.fir_status());
            value.cx(node.x + this.x(), mng.sec_status());
            value.cy(node.y + 3 + this.y(), mng.sec_status());
        });
    }
}