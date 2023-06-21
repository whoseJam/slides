import { Box } from "#lib/box.js";
import { ElementContainer, Element } from "#lib/element.js";

export class Array {
    constructor(draw) {
        Box(this);
        ElementContainer(this);

        this.draw_ = draw;
        this.elements_ = [];
    }

    dx(delta, animate = false) {
        this.x_ += delta;
        this.elements_.forEach((ele) => {
            ele.dx(delta, animate);
        });
    }

    dy(delta, animate = false) {
        this.y_ += delta;
        this.elements_.forEach((ele) => {
            ele.dy(delta, animate);
        });
    }

    value(idx) {
        return this.elements_[idx].value_;
    }

    maintain(animate = false) {
        this.elements_.forEach((ele, idx) => {
            ele.width(this.element_width_, animate);
            ele.height(this.element_height_, animate);
            ele.x(this.x_ + idx * this.element_width_, animate);
            ele.y(this.y_, animate);
            ele.layout(this.layout_, animate);
            ele.show_bound(this.show_bounds_, animate);
        });
        this.width_ = this.element_width_ * this.elements_.length;
        this.height_ = this.element_height_;
    }

    append(value, animate = false) {
        let ele = new Element(this.draw_);
        ele.value(value);
        this.elements_.push(ele);
        this.maintain();
        if (animate) {
            ele = this.elements_[this.elements_.length - 1];
            let dy = this.element_height_;
            ele.dy(-dy);
            // ele.opacity(0);
            ele.dy(dy, animate);
            // ele.opacity(1, animate);
        }
    }

    remove(idx, animate = false) {
        let ele = this.elements_[idx];
        for (let i = idx; i < this.elements_.length - 1; i++) {
            this.elements_[i] = this.elements_[i + 1];
            this.elements_[i].dx(-this.element_width_, animate);
        }
        this.elements_.pop();
        let dy = this.element_height_;
        ele.dy(dy, animate);
        ele.opacity(0, animate);
        this.width_ = this.element_width_ * this.elements_.length;
        this.height_ = this.element_height_;
    }

    split(l, r, direction = 1, animate = false) {
        // r++;
        // let old_values = [];
        // let old_bounds = [];
        // let new_values = [];
        // let new_bounds = [];
        // for (let i = 0; i < this.values_.length; i++) {
        //     if (l <= i && i <= r) {
        //         new_values.push(this.values_[i]);
        //         new_bounds.push(this.boundarys_[i]);
        //     } else {
        //         old_values.push(this.values_[i]);
        //         old_bounds.push(this.boundarys_[i]);
        //     }
        // }
        // let arr = new Array();
        // for (let i = 0; i < new_values.length; i++) {
        //     let dy = this.element_height_ * 2 * direction;
        //     new_values[i].dy(dy, animate);
        //     if (animate) new_bounds[i].animate({ when: "now" }).dy(dy);
        //     else new_bounds[i].dy(dy);
        // }
        // arr.values_ = new_values;
        // arr.boundarys_ = new_bounds;
        // arr.element_height_ = this.element_width_;
        // arr.element_height_ = this.element_height_;
        // arr.x_ = this.x_ + this.element_width_ * l;
        // arr.y_ = this.y_;
        // arr.width_ = this.element_width_ * (r - l + 1);
        // arr.height_ = arr.element_height_;
        // this.values_ = old_values;
        // this.boundarys_ = old_bounds;
        // return arr;
    }

    reverse(animate = false) {
    }
}