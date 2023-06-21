
import { Box } from "#lib/box.js";
import { Basic } from "#lib/basic.js";
import { BasicLine } from "#lib/basic_line.js";
import { create_handle } from "#lib/utility.js";

export class Edge {
    constructor(draw) {
        Box(this);
        Basic(this);
        BasicLine(this, draw);

        this.vertex_s_ = null;
        this.vertex_e_ = null;
        this.tree_mark_ = false;
        this.value_ = null;
        this.draw_ = draw;
        this.line_ = draw.line().stroke({ color: "#000000", width: 1 });
    }

    color(color, animate = false) {
        create_handle(this.line_, animate).stroke({ color: color });
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
        if (this.value_ != null) {
            this.value_.cx(this.cx());
            this.value_.cy(this.cy());
            this.value_.opacity(0);
            this.value_.opacity(1, animate);
        }
    }

    start(new_vertex_s) {
        if (typeof(new_vertex_s) === "undefined")
            return this.vertex_s_;
        this.position_flag_ = true;
        this.vertex_s_ = new_vertex_s;
        this.maintain();
    }

    end(new_vertex_e) {
        if (typeof(new_vertex_e) === "undefined")
            return this.vertex_e_;
        this.position_flag_ = true;
        this.vertex_e_ = new_vertex_e;
        this.maintain();
    }

    maintain(animate = false) {
        if (this.position_flag_ && 
            this.vertex_s_ != null &&
            this.vertex_e_ != null) {
            this.position_flag_ = false;
            console.log(this.vertex_s_, this.vertex_e_);
            let sx = this.vertex_s_.cx();
            let sy = this.vertex_s_.cy();
            let ex = this.vertex_e_.cx();
            let ey = this.vertex_e_.cy();
            let dx = (ex - sx);
            let dy = (ey - sy);
            let len = Math.sqrt(dx * dx + dy * dy);
            dx /= len;
            dy /= len;
            create_handle(this.line_, animate).plot(
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

        if (this.opacity_flag_) {
            this.opacity_flag_ = false;
            create_handle(this.line_, animate).stroke({ opacity: this.opacity_});
            if (this.value_ != null) {
                create_handle(this.value_, animate).opacity(this.opacity_);
            }
        }
    }
}