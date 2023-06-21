
import { Box } from "#lib/box.js";
import { create_handle } from "#lib/utility.js";
import { ElementContainer, Element } from "#lib/element.js";

export class Grid {
    constructor(draw) {
        Box(this);
        ElementContainer(this);

        this.draw_ = draw;
        this.elements_ = [];
        this.records_ = [];
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
        while (this.elements_.length < this.n_ * this.m_) {
            let empty_element = new Element(this.draw_);
            empty_element.width(this.element_width_);
            empty_element.height(this.element_height_);
            this.elements_.push(empty_element);
        }
        for (let i = 0; i < this.n_; i++) {
            for (let j = 0; j < this.m_; j++) {
                let x = this.x_ + j * this.element_width_;
                let y = this.y_ + i * this.element_height_;
                let element = this.elements_[this.idx(i, j)];
                element.x(x);
                element.y(y);
            }
        }
        this.records_.forEach((record) => {
            let element = this.elements_[this.idx(
                record.i_, 
                record.j_)];
            element.value(record.value_);
        });
        this.width_ = this.element_width_ * this.m_;
        this.height_ = this.element_height_ * this.n_;
    }

    idx(i, j) {
        return i * this.m_ + j;
    }

    color(i, j, color, animate = false) {
        let element = this.elements_[this.idx(i, j)];
        element.color(color, animate);
    }

    default_color(i, j, animate = false) {
        let element = this.elements_[this.idx(i, j)];
        element.default_color(animate);
    }

    value(i, j, value, animate = false) {
        let element = this.elements_[this.idx(i, j)];
        element.value(value, animate);
    }
}