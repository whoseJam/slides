import { Box } from "#lib/box.js";
import { ElementContainer, Element } from "#lib/element.js";

export class Stack {
    constructor(draw) {
        Box(this);
        ElementContainer(this);
        
        this.draw_ = draw;
        this.elements_ = [];
    }

    element_height(new_element_height, animate = false) {
        if (typeof(new_element_height) === "undefined")
            return this.element_height_;
        this.element_height_ = new_element_height;
        this.maintain(animate);
    }

    element_width(new_element_width, animate = false) {
        if (typeof(new_element_width) === "undefined")
            return this.element_width_;
        this.element_width_ = new_element_width;
        this.maintain(animate);
    }

    impl_height(new_height, animate = false) {
        if (this.elements_.length === 0) return;
        this.element_height_ = new_height / this.elements_.length;
        this.maintain(animate);
    }

    impl_width(new_width, animate = false) {
        this.element_width_ = new_width;
        this.maintain(animate);
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

    maintain(animate = false) {
        this.elements_.forEach((ele, idx) => {
            ele.width(this.element_width_, animate);
            ele.height(this.element_height_, animate);
            ele.x(this.x_, animate);
            ele.y(this.y_ - idx * this.element_height_, animate);
            ele.layout(this.layout_);
            ele.show_boundary(this.show_bounds_, animate);
        });
        this.width_ = this.element_width_;
        this.height_ = this.element_height_ * this.elements_.length;
    }

    push(value, animate = false) {
        let ele = new Element(this.draw_);
        ele.value(value);
        this.elements_.push(ele);
        this.maintain();
        if (animate) {
            ele = this.elements_[this.elements_.length - 1];
            let dy = this.element_height_;
            ele.dy(-dy);
            ele.opacity(0);
            ele.dy(dy, animate);
            ele.opacity(1, animate);
        }
    }

    pop(animate = false) {
        let ele = this.elements_.pop();
        let dy = -this.element_height_;
        ele.opacity(0, animate);
        ele.dy(dy, animate);
    }
}