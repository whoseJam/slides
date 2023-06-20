
import { Box } from "#lib/box.js"

export class Vertex {
    constructor(draw) {
        Box(this);
        this.value_ = Object();
        this.draw_ = draw;
        this.to_ = [];
        this.x_ = 0;
        this.y_ = 0;
        this.tree_mark_ = false;
        this.line_width_ = 1;
        this.spare_rate_ = 1.2;
        this.show_boundary_ = true;
        this.radius_ = 15;
        this.circ_ = draw.circle(this.radius_ * 2)
            .x(this.x_)
            .y(this.y_)
            .fill({ opacity: 0 })
            .stroke({ color: "#000", width: this.line_width_ });
        this.width_ = this.radius_ * 2;
        this.height_ = this.radius_ * 2;
    }

    value(new_value, animate = false) {
        console.log("set new value=", new_value);
        if (typeof(new_value) === "undefined")
            return this.value_;
        this.value_ = new_value;
        this.value_.cx(this.cx());
        this.value_.cy(this.cy());
        this.value_.opacity(0);
        this.value_.opacity(1, animate);
    }

    dx(delta, animate = false) {
        this.x_ += delta;
        let circ_handle = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        circ_handle.x(this.x_);
        this.value_.dx(delta, animate);
    }

    dy(delta, animate = false) {
        this.y_ += delta;
        let circ_handle = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        circ_handle.y(this.y_);
        this.value_.dy(delta, animate);
    }

    link(x) {
        this.to_.push(x);
    }

    maintain(animate = false) {
        let expect_width = this.radius_ * 2 / this.spare_rate_;
        if (Math.abs(this.value_.width() - expect_width) > 0.2)
            this.value_.width(expect_width, animate);
        let circ_handle_r = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        let circ_handle_x = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        let circ_handle_y = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        circ_handle_r.attr({ r: this.radius_ });
        circ_handle_x.x(this.x_);
        circ_handle_y.y(this.y_);
        this.width_ = this.radius_ * 2;
        this.height_ = this.radius_ * 2;
        this.value_.cx(this.cx(), animate);
        this.value_.cy(this.cy(), animate);
    }

    color(fill_color, stroke_color, animate = false) {
        let circ_handle_f_opacity = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        let circ_handle_f_color = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        let circ_handle_s_color = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        circ_handle_f_opacity.fill({ opacity: 1 });
        circ_handle_f_color.fill({ color: fill_color });
        circ_handle_s_color.stroke({ color: stroke_color });
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
        let circ_handle_f_opacity = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        let circ_handle_f_color = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        let circ_handle_s_color = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        circ_handle_f_opacity.fill({ opacity: 0 });
        circ_handle_f_color.fill({ color: "#ffffff" });
        circ_handle_s_color.stroke({ color: "#000000" });
    }

    radius(new_radius, animate = false) {
        if (typeof(new_radius) === "undefined")
            return this.radius_;
        if (Math.abs(new_radius - this.radius_) < 1e-5) return;
        this.radius_ = new_radius;
        this.maintain(animate);
    }

    show_boundary(show, animate = false) {
        let stroke_handle = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
        stroke_handle.stroke({ opacity: show ? 1 : 0 });
        this.show_boundary_ = show;
    }

    opacity(new_opacity, animate = false) {
        if (typeof(new_opacity) === "undefined")
            return this.value_.opacity();
        if (this.show_boundary_) {
            let stroke_handle = (animate) ? this.circ_.animate({ when: "now" }) : this.circ_;
            stroke_handle.stroke({ opacity: new_opacity });
        }
        this.value_.opacity(new_opacity);
    }
}