import * as d3 from "d3";
import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";
import { Color } from "./color";
import { Util } from "./utility";
import { Text } from "./text";
import { Line } from "./line";
import { Circle } from "./circle";

export class Tree {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._register_animation_channel("_tree");
        this._rate = 1.2;
        this._radius = 20;
        this._group = svg.append("g");
        this._links_group = this._group.append("g");
        this._nodes_group = this._group.append("g");
        this._node_covers_group = this._group.append("g");
        this._node_contents_group = this._group.append("g");
        this._data = {};
        this._plain_data = [];
        this._parent_id = "parent";
        this._id = "id";
        this._tree = d3.tree();
        this._tree["x"] = 0;
        this._tree["y"] = 0;
        this._tree["width"] = 300;
        this._tree["height"] = 300;
    }

    _depth() {
        this._info = this._tree(this._dataset);
        return this._info.height + 1;
    }
    
    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined") {
            let result = this._animation_check("_tree", "x");
            return Number(result ? result : this._tree["x"]);
        }
        this._tree["x"] = new_x;
        this._update_tree(animate);
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined") {
            let result = this._animation_check("_tree", "y");
            return Number(result ? result : this._tree["y"]);
        }
        this._tree["y"] = new_y;
        console.log("update new y=",new_y);
        console.trace()
        this._update_tree(animate);
    }

    width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined") {
            let result = this._animation_check("_tree", "width");
            return Number(result ? result : this._tree["width"]);
        }
        this._tree["width"] = new_width;
        this._update_tree(animate);
    }

    height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined") {
            let result = this._animation_check("_tree", "height");
            return Number(result ? result : this._tree["height"]);
        }
        this._tree["height"] = new_height;
        this._update_tree(animate);
    }
    
    _get_plain_data(id) {
        let ret = this._plain_data.filter((data) => {
            return data[this._id] === id;
        })[0];
        if (typeof(ret) === "undefined")
            throw new Error(id + " not found");
        return ret;
    }

    _get_plain_data_line(parent_id, id) {
        let ret = this._plain_data.filter((data) => {
            return data[this._id] === id && data[this._parent_id] === parent_id;
        })[0];
        if (typeof(ret) === "undefined")
            throw new Error(parent_id + " -> " + id + " not found");
        return ret;
    }

    _update_tree_line(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        this._info
            .links()
            .forEach((data) => {
                let record = this._get_plain_data_line(
                data.source.data.id,
                data.target.data.id);
                let line = record.line;
                if (typeof(line) === "undefined") {
                    line = new Line(this._links_group);
                    line.x1(data.source.x + this.x()); line.y1(data.source.y + this.y());
                    line.x2(data.target.x + this.x()); line.y2(data.target.y + this.y());
                    line.stroke(Color.black);
                    line.opacity(0);
                    line.opacity(1, mng.fir_status());
                    record.line = line;
                } else {
                    line.x1(data.source.x + this.x(), mng.fir_status());
                    line.y1(data.source.y + this.y(), mng.sec_status());
                    line.x2(data.target.x + this.x(), mng.sec_status());
                    line.y2(data.target.y + this.y(), mng.sec_status());
                }
            })
    }

    _update_tree_node(configure, animate = Anitype.none) {
        let mng = this._animation_status(animate);
        this._info.descendants()
            .forEach((data) => {
                console.log(data);
                let record = this._get_plain_data(data.data.id);
                // 修改每一个白底节点的坐标
                let node = record.node;
                if (typeof(node) === "undefined") {
                    node = new Circle(this._nodes_group);
                    node.radius(this._radius);
                    node.fill(Color.white);
                    node.fill_opacity(1);
                    node.stroke(Color.white);
                    node.stroke_opacity(1);
                    node.cx(data.x + this.x());
                    node.cy(data.y + this.y());
                    node.stroke_opacity(1, mng.fir_status());
                    record.node = node;
                } else {
                    node.cx(data.x + this.x(), mng.fir_status());
                    node.cy(data.y + this.y(), mng.sec_status());
                }

                // 修改每一个背景节点的坐标
                let node_cover = record.node_cover;
                if (typeof(node_cover) === "undefined") {
                    node_cover = new Circle(this._node_covers_group);
                    node_cover.radius(this._radius);
                    node_cover.fill(Color.white);
                    node_cover.fill_opacity(0);
                    node_cover.stroke(Color.black);
                    node_cover.stroke_opacity(1);
                    node_cover.cx(data.x + this.x());
                    node_cover.cy(data.y + this.y());
                    node_cover.stroke_opacity(1, mng.fir_status());
                    record.node_cover = node_cover;
                } else {
                    node_cover.cx(data.x + this.x(), mng.fir_status());
                    node_cover.cy(data.y + this.y(), mng.sec_status());
                }
            })
    }

    _update_tree(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        this._dataset = d3.hierarchy(this._data);
        this._tree = this._tree
            .size([this.width(), this.height()])
            // .x(this.x())
            // .y(this.y());
        this._info = this._tree(this._dataset);
        
        // 修改每一条树边的坐标
        this._update_tree_line();

        // 修改每一个白底节点的坐标
        // 修改每一个背景节点的坐标
        this._update_tree_node(animate);
        
        // 修改每一个节点内容的坐标
        let node_contents = this._node_contents_group
            .selectAll("*")
            .data(this._info.descendants());
        node_contents.enter().append("g").each((node) => {
            let value = node.data.data.value;
            value.cx(node.x + this.x());
            value.cy(node.y + 3 + this.y());
            value.opacity(0);
            value.opacity(1, mng.fir_status());
            this._update_plain_data_value(node.data.id, value);
        });
        node_contents.each((node) => {
            let value = node.data.data.value;
            value.cx(node.x + this.x(), mng.fir_status());
            value.cy(node.y + 3 + this.y(), mng.sec_status());
        });
    }

    plain_data(new_data, id, parentId, animate = Anitype.none) {
        if (typeof(new_data) === "undefined")
            return this._plain_data;
        this._plain_data = new_data;
        this._id = id;
        this._parent_id = parentId;
        this._data = d3.stratify()
            .id(d => d[id])
            .parentId(d => d[parentId])
            (this._plain_data);
        this._update_tree(animate);
    }

    append_plain_data(new_record, animate = Anitype.none) {
        this._plain_data.push(new_record);
        this._data = d3.stratify()
            .id(d => d[this._id])
            .parentId(d => d[this._parent_id])
            (this._plain_data);
        this._update_tree(animate);
    }

    link(parent, child, animate = Anitype.none) {
        let item = {};
        item[this._parent_id] = parent;
        item[this._id] = child;
        item["value"] = new Text(this._node_contents_group, child);
        this.append_plain_data(item, animate);
    }

    root(root, animate = Anitype.none) {
        let item = {};
        item[this._parent_id] = "";
        item[this._id] = root;
        item["value"] = new Text(this._node_contents_group, root);
        this.append_plain_data(item, animate);
    }

    radius(new_radius, animate = Anitype.none) {
        if (typeof(new_radius) === "undefined")
            return this._radius;
        this._radius = new_radius;
        let mng = this._animation_status(animate);
        let nodes_group = this._nodes_group
            .selectAll("*")
            .data(this._info.descendants());
        nodes_group.each((data) => {
            let node = this._get_plain_data(data.data.id).node;
            node.radius(this._radius, mng.fir_status());
        })
        let node_covers_group = this._node_covers_group
            .selectAll("*")
            .data(this._info.descendants());
        node_covers_group.each((data) => {
            let node_cover = this._get_plain_data(data.data.id).node_cover;
            node_cover.radius(this._radius, mng.fir_status());
        });
    }

    color_all(new_color, animate = Anitype.none) {
        if (typeof(new_color) === "undefined")
            return this._color;
        let mng = this._animation_status(animate);
        this._color = new_color;
        let node_covers_group = this._node_covers_group
            .selectAll("*")
            .data(this._info.descendants());
        node_covers_group.each((data) => {
            let node_cover = this._get_plain_data(data.data.id).node_cover;
            node_cover.fill(new_color.main, mng.fir_status());
            node_cover.fill_opacity(1, mng.sec_status());
            node_cover.stroke(new_color.border, mng.sec_status());
            node_cover.stroke_opacity(1, mng.sec_status());
        });
    }

    color(id, new_color, animate = Anitype.none) {
        if (typeof(new_color) === "undefined")
            return this._color;
        let mng = this._animation_status(animate);
        let node_cover  = this._get_plain_data(id).node_cover;
        node_cover.fill(new_color.main, mng.fir_status());
        node_cover.fill_opacity(1, mng.sec_status());
        node_cover.stroke(new_color.border, mng.sec_status());
        node_cover.stroke_opacity(1, mng.sec_status());
    }

    rate(new_rate, animate = Anitype.none) {
        if (typeof(new_rate) === "undefined")
            return this._rate;
        this._rate = new_rate;
        this.update_content_size(animate);
    }

    update_content_size(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        let node_contents = this._node_contents_group
            .selectAll("*")
            .data(this._info.descendants());
        node_contents.each((data) => {
            let value = data.data.data.value;
            if (value.width() > value.height()) value.width(this.radius() * 2 / this.rate(), mng.fir_status());
            else value.height(this.radius() * 2 / this.rate(), mng.fir_status());
            value.cx(data.x + this.x(), mng.sec_status());
            value.cy(data.y + 3 + this.y(), mng.sec_status());
        });
    }
}