import { Box } from "./box";
import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";

export class Array {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._elements_group = svg.append("g");
        this._elements = [];
        this._element_width = 30;
        this._element_height = 30;
        this._x = 0;
        this._y = 0;
    }

    _update_elements(animate = Anitype.none) {
        this._elements.forEach((value, idx) => {
            value.width(this._element_width, animate);
            value.height(this._element_height, animate);
            value.x(this._x + idx * this._element_width, animate);
            value.y(this._y, animate);
        });
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined")
            return this._x;
        this._x = new_x;
        this._update_elements(animate);
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined")
            return this._y;
        this._y = new_y;
        this._update_elements(animate);
    }

    element_width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this._element_width;
        this._element_width = new_width;
        this._update_elements(animate);
    }

    element_height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined")
            return this._element_height;
        this._element_height = new_height;
        this._update_elements(animate);
    }

    element(idx) {
        return this._elements[idx];
    }

    append(value, animate = Anitype.none) {
        let ele = new Box(this._svg);
        ele.value(value);
        this._elements.push(ele);
        this._update_elements(Anitype.none);
        if (animate != Anitype.none) {
            ele = this._elements[this._elements.length - 1];
            let dy = this._element_height;
            ele.dy(-dy);
            ele.opacity(0);
            ele.dy(dy, Anitype.append);
            ele.opacity(1, Anitype.append);
        }
    }

    remove(idx, animate = Anitype.none) {
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

    split(l, r, direction = 1, animate = Anitype.none) {
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

    reverse(animate = Anitype.none) {
    }
}