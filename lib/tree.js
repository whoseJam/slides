import * as d3 from "d3";
import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";
import { Color } from "./color";
import { Util } from "./utility";
import { Line } from "./line";
import { Circle } from "./circle";

export class Tree {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._rate = 1.2;
        this._radius = 20;
        this._group = svg.append("g");
        this._links_group = this._group.append("g");
        this._nodes_group = this._group.append("g");
        this._node_covers_group = this._group.append("g");
        this._node_contents_group = this._group.append("g");
        this._data = {};
        this._plain_data = [];
    }

    _update_plain_data_value(id, value) {
        this._get_plain_data(id).value = value;
    }

    _get_plain_data(id) {
        let ret = this._plain_data.filter((data) => {
            return data[this._id] === id;
        })[0];
        if (typeof(ret) === "undefined")
            throw new Error(id + " not found");
        return ret;
    }

    _update_plain_data_line(parent_id, id, line) {
        this._get_plain_data_line(parent_id, id).line = line;
    }

    _get_plain_data_line(parent_id, id) {
        let ret = this._plain_data.filter((data) => {
            return data[this._id] === id && data[this._parent_id] === parent_id;
        })[0];
        if (typeof(ret) === "undefined")
            throw new Error(parent_id + " -> " + id + " not found");
        return ret;
    }

    _update_tree(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        this._dataset = d3.hierarchy(this._data);
        this._tree_layout = d3.tree()
            .size([300, 300]);
        this._info = this._tree_layout(this._dataset);
        
        let links_group = this._links_group
            .selectAll("*")
            .data(this._info.links());
        links_group.each((data) => {
            let line = this._get_plain_data_line(
                data.source.data.id,
                data.target.data.id).line;
            line.x1(data.source.x, mng.fir_status());
            line.y1(data.source.y, mng.sec_status());
            line.x2(data.target.x, mng.sec_status());
            line.y2(data.target.y, mng.sec_status());
        });
        links_group.enter().each((data) => {
            let line = new Line(this._links_group);
            line.x1(data.source.x); line.y1(data.source.y);
            line.x2(data.target.x); line.y2(data.target.y);
            line.stroke(Color.black);
            line.opacity(0);
            line.opacity(1, mng.fir_status());
            this._update_plain_data_line(
                data.source.data.id,
                data.target.data.id,
                line);
        });

        let nodes_group = this._nodes_group
            .selectAll("*")
            .data(this._info.descendants());
        nodes_group.each((data) => {
            let node = this._get_plain_data(data.data.id).node;
            console.log(mng.fir_status(), mng.sec_status(), "move", node);
            node.cx(data.x, mng.fir_status());
            node.cy(data.y, mng.sec_status());
        });
        nodes_group.enter().each((data) => {
            let node = new Circle(this._nodes_group);
            node.radius(this._radius);
            node.fill(Color.white);
            node.fill_opacity(1);
            node.stroke(Color.white);
            node.stroke_opacity(1);
            node.cx(data.x);
            node.cy(data.y);
            node.stroke_opacity(1, mng.fir_status());
            this._get_plain_data(data.data.id).node = node;
        });

        let node_covers_group = this._node_covers_group
            .selectAll("*")
            .data(this._info.descendants());
        node_covers_group.each((data) => {
            let node_cover = this._get_plain_data(data.data.id).node_cover;
            node_cover.cx(data.x, mng.fir_status());
            node_cover.cy(data.y, mng.sec_status());
        });
        node_covers_group.enter().each((data) => {
            let node_cover = new Circle(this._node_covers_group);
            node_cover.radius(this._radius);
            node_cover.fill(Color.white);
            node_cover.fill_opacity(0);
            node_cover.stroke(Color.black);
            node_cover.stroke_opacity(1);
            node_cover.cx(data.x);
            node_cover.cy(data.y);
            node_cover.stroke_opacity(1, mng.fir_status());
            this._get_plain_data(data.data.id).node_cover = node_cover;
        });
        
        let node_contents = this._node_contents_group
            .selectAll("*")
            .data(this._info.descendants());
        node_contents.enter().append("g").each((node) => {
            let value = (typeof(node.data.data.value) === "function") ? 
                node.data.data.value() : node.data.data.value;
            value.cx(node.x);
            value.cy(node.y + 3);
            value.opacity(0);
            value.opacity(1, mng.fir_status());
            this._update_plain_data_value(node.data.id, value);
        });
        node_contents.each((node) => {
            let data = node.data;
            let value = (typeof(data.data.value) === "function") ? 
                node.data.data.value() : node.data.data.value;
            value.cx(node.x, mng.fir_status());
            value.cy(node.y + 3, mng.sec_status());
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

    radius(new_radius, animate = Anitype.none) {
        if (typeof(new_radius) === "undefined")
            return this._radius;
        let mng = this._animation_status(animate);
        this._radius = new_radius;
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
            value.cx(data.x, mng.sec_status());
            value.cy(data.y + 3, mng.sec_status());
        });
    }
}