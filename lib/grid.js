
import { Box } from "#lib/box.js";

export class Grid {
    constructor(draw) {
        Box(this);
        this.draw_ = draw;
        this.values_ = [];
        this.bounds_ = [];
        this.element_width_ = 25;
        this.element_height_ = 25;
        this.n_ = 0;
        this.m_ = 0;
        this.spare_rate = 1.2;
    }

    element_height() {
        return this.element_height_;
    }

    element_width() {
        return this.element_width_;
    }

    dx(delta, animate = false) {
        this.x_ += delta;
        this.values_.forEach((value) => {
            value.dx(delta, animate);
        });
        this.bounds_.forEach((bound) => {
            let bound_handle = (animate) ? bound.animate() : bound;
            bound_handle.dx(delta);
        });
    }
    
    dy(delta, animate = false) {
        this.y_ += delta;
        this.values_.forEach((value) => {
            value.dy(delta, animate);
        });
        this.bounds_.forEach((bound) => {
            let bound_handle = (animate) ? bound.animate() : bound;
            bound_handle.dy(delta);
        });
    }

    n(new_n, animate = false) {
        if (typeof(new_n) === "undefined")
            return this.n_;
        this.n_ = new_n;
        this.maintain(animate);
    }

    m(new_m, animate = false) {
        if (typeof(new_m) === "undefined")
            return this.m_;
        this.m_ = new_m;
        this.maintain(animate);
    }

    maintain(animate = false) {
        while (this.bounds_.length < this.n_ * this.m_) {
            let bound = this.draw_.rect(this.element_width_, this.element_height_);
            bound.stroke({ width: 1, opacity: 1, color: "#000000" });
            bound.fill({ opacity: 0 });
            this.bounds_.push(bound);
        }
        for (let i = 0; i < this.n_; i++) {
            for (let j = 0; j < this.m_; j++) {
                let x = this.x_ + j * this.element_width_;
                let y = this.y_ + i * this.element_height_;
                let bound = this.bounds_[this.idx(i, j)];
                bound.x(x);
                bound.y(y);
            }
        }
    }

    idx(i, j) {
        return i * this.m_ + j;
    }

    color(i, j, fill_color, animate = false) {
        let bound = this.bounds_[this.idx(i, j)];
        let bound_handle_f_opacity = (animate) ? bound.animate({ when: "now" }) : bound;
        let bound_handle_f_color = (animate) ? bound.animate({ when: "now" }) : bound;
        bound_handle_f_opacity.fill({ opacity: 1 });
        bound_handle_f_color.fill({ color: fill_color });
    }

    blue(i, j, animate = false) {
        this.color(i, j, "#bbe0e3", animate);
    }

    grey(i, j, animate = false) {
        this.color(i, j, "#cccccc", animate);
    }

    green(i, j, animate = false) {
        this.color(i, j, "#92d050", animate);
    }

    default_color(i, j, animate = false) {
        let bound = this.bounds_[this.idx(i, j)];
        let bound_handle_f_opacity = (animate) ? bound.animate({ when: "now" }) : bound;
        let bound_handle_f_color = (animate) ? bound.animate({ when: "now" }) : bound;
        bound_handle_f_opacity.fill({ opacity: 0 });
        bound_handle_f_color.fill({ color: "#000000" });
    }
}