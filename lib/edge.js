
import { Vertex } from "#lib/vertex.js";
import { Box } from "#lib/box.js";

export class Edge extends Box {
    constructor(draw) {
        super();
        this.vertex_s_ = null;
        this.vertex_e_ = null;
        this.line_width_ = 1;
        this.tree_mark_ = false;
        this.value_ = Object();
        this.draw_ = draw;
        this.x_ = 0;
        this.y_ = 0;
        this.line_ = this.draw_.line()
            .stroke({ color: "#000", width: this.line_width_ });
    }

    dx(delta, animate = false) {
        this.x_ += delta;
        this.value_.dx(delta, animate);
        this.line_.dx(delta);
    }

    dy(delta, animate = false) {
        this.y_ += delta;
        this.value_.dy(delta, animate);
        this.line_.dy(delta);
    }

    color(color, animate = false) {
        let line_handle = (animate) ? this.line_.animate({ when: "now" }) : this.line_;
        line_handle.stroke({ color: color });
    }

    red(animate = false) {
        this.color("#ff0000", animate);
    }

    default_color(animate = false) {
        this.color("#000000", animate);
    }

    value(new_value, animate = false) {
        if (typeof(new_value) === "undefined")
            return this.value_;
        this.value_ = new_value;
        this.value_.cx(this.cx());
        this.value_.cy(this.cy());
        this.value_.opacity(0);
        this.value_.opacity(1, animate);
    }

    start(new_vertex_s) {
        if (typeof(new_vertex_s) === "undefined")
            return this.vertex_s_;
        this.vertex_s_ = new_vertex_s;
    }

    end(new_vertex_e) {
        if (typeof(new_vertex_e) === "undefined")
            return this.vertex_e_;
        this.vertex_e_ = new_vertex_e;
    }

    value(new_value) {
        if (typeof(new_value) === "undefined")
            return this.value_;
        this.value_ = new_value;
    }

    maintain(animate = false) {
        let sx = this.vertex_s_.cx();
        let sy = this.vertex_s_.cy();
        let ex = this.vertex_e_.cx();
        let ey = this.vertex_e_.cy();
        let dx = (ex - sx);
        let dy = (ey - sy);
        let len = Math.sqrt(dx * dx + dy * dy);
        dx /= len;
        dy /= len;
        let line_handle = (animate) ? this.line_.animate({ when: "now" }) : this.line_;
        line_handle.plot(
            sx + dx * this.vertex_s_.radius(), 
            sy + dy * this.vertex_s_.radius(), 
            ex - dx * this.vertex_e_.radius(), 
            ey - dy * this.vertex_e_.radius());
        this.x_ = Math.min(sx, ex);
        this.y_ = Math.min(sy, ey);
        this.width_ = Math.max(sx, ex) - this.x_;
        this.height_ = Math.max(sy, ey) - this.y_;
        if (this.value_ != null) {
            this.value_.cx(this.cx(), animate);
            this.value_.cy(this.cy(), animate);
        }
    }

    opacity(new_opacity, animate = false) {
        if (typeof(new_opacity) === "undefined")
            return this.line_.opacity();
        let line_handle = (animate) ? this.line_.animate({ when: "now" }) : this.line_;
        line_handle.stroke({ opacity: new_opacity });
        if (this.value_ != null) {
            let value_handle = (animate) ? this.value_.animate({ when: "now" }) : this.value_;
            value_handle.opacity(new_opacity, animate);
        }
    }
}