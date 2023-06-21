
import { Box } from "#lib/box.js";
import { Basic } from "#lib/basic.js";
import { BasicBound } from "#lib/basic_bound.js";
import { create_handle } from "#lib/utility.js";

export class Vertex {
    constructor(draw) {
        Box(this);
        Basic(this);
        BasicBound(this);

        this.value_ = Object();
        this.draw_ = draw;
        this.to_ = [];
        this.x_ = 0;
        this.y_ = 0;
        this.tree_mark_ = false;
        this.radius_ = 15;
        this.circ_ = draw.circle(this.radius_ * 2)
            .fill({ opacity: 0 })
            .stroke({ color: "#000", width: 1 });
        this.width_ = this.radius_ * 2;
        this.height_ = this.radius_ * 2;
    }

    value(new_value, animate = false) {
        if (typeof(new_value) === "undefined")
            return this.value_;
        this.position_flag_ = true;
        this.value_ = new_value;
        this.value_.cx(this.cx());
        this.value_.cy(this.cy());
        this.value_.opacity(0);
        this.value_.opacity(1, animate);
        this.maintain(animate);
    }

    link(x) {
        this.to_.push(x);
    }

    maintain(animate = false) {
        if (this.position_flag_) {
            let expect = this.radius_ * 2 / 1.2;
            if (this.value_.width_ > this.value_.height_ && Math.abs(this.value_.width_ - expect) > 0.2)
                this.value_.width(expect, animate);
            if (this.value_.width_ <= this.value_.height_ && Math.abs(this.value_.height_ - expect) > 0.2)
                this.value_.height(expect, animate);
            create_handle(this.circ_, animate).attr({ r: this.radius_ });
            create_handle(this.circ_, animate).x(this.x_);
            create_handle(this.circ_, animate).y(this.y_);
            this.width_ = this.radius_ * 2;
            this.height_ = this.radius_ * 2;
            this.value_.cx(this.cx(), animate);
            this.value_.cy(this.cy(), animate);
        }

        if (this.opacity_flag_) {
            this.value_.opacity(this.opacity_)
            create_handle(this.circ_, animate).stroke({ opacity: this.opacity_ });
        }
    }

    color(fill_color, stroke_color, animate = false) {
        create_handle(this.circ_, animate).fill({ opacity: 1 });
        create_handle(this.circ_, animate).fill({ color: fill_color });
        create_handle(this.circ_, animate).stroke({ color: stroke_color });
    }

    blue(animate = false) {
        this.color("#bbe0e3", "#89a4a7", animate);
    }

    grey(animate = false) {
        this.color("#cccccc", "#808080", animate);
    }
    
    green(animate = false) {
        this.color("#92d050", "#00b050", animate);
    }

    default_color(animate = false) {
        create_handle(this.circ_, animate).fill({ opacity: 0 });
        create_handle(this.circ_, animate).fill({ color: "#ffffff" });
        create_handle(this.circ_, animate).stroke({ color: "#000000" });
    }

    radius(new_radius, animate = false) {
        if (typeof(new_radius) === "undefined")
            return this.radius_;
        if (Math.abs(new_radius - this.radius_) < 1e-5) return;
        this.position_flag_ = true;
        this.radius_ = new_radius;
        this.maintain(animate);
    }
}