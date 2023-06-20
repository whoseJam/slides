
import { Box } from "#lib/box.js";
import { Basic } from "#lib/basic.js";
import { create_handle } from "#lib/utility.js";

const Layout = (value) => {
    value.layout_ = "center";

    value.layout = (new_layout, animate = false) => {
        if (typeof(new_layout) === "undefined")
            return value.layout_;
        value.layout_ = new_layout;
        value.maintain(animate);
    }

    value.maintain_layout = (x, y, width, height, ele, animate = false) => {
        let mx = x + width;
        let cx = x + width / 2;
        let my = y + height;
        let cy = y + height / 2;
        if (value.layout_ === "top_left") {
            ele.x(x, animate);
            ele.y(y, animate);
        } else if (value.layout_ === "top") {
            ele.cx(cx, animate);
            ele.y(y, animate);
        } else if (value.layout_ === "top_right") {
            ele.mx(mx, animate);
            ele.y(y, animate);
        } else if (value.layout_ === "left") {
            ele.x(x, animate);
            ele.cy(cy, animate);
        } else if (value.layout_ === "center") {
            ele.cx(cx, animate);
            ele.cy(cy, animate);
        } else if (value.layout_ === "right") {
            ele.mx(mx, animate);
            ele.cy(cy, animate);
        } else if (value.layout_ === "bottom_left") {
            ele.x(x, animate);
            ele.my(my, animate);
        } else if (value.layout_ === "bottom") {
            ele.cx(cx, animate);
            ele.my(my, animate);
        } else if (value.layout_ === "bottom_right") {
            ele.mx(mx, animate);
            ele.my(my, animate);
        }
    }
}

export class Element {
    constructor(draw) {
        Box(this);
        Basic(this);
        Layout(this);

        this.draw_ = draw;
        this.value_ = Object();
        this.bound_ = draw.rect(0, 0);
        this.bound_.stroke({ width: 1, opacity: 1, color: "#000000" });
        this.bound_.fill({ opacity: 0 });
        this.show_bound_ = true;
        this.spare_rate_ = 1.2;
    }

    show_bound(new_show, animate = false) {
        if (typeof(new_show) === "undefined")
            return this.show_bound_;
        this.opacity_flag_ = true;
        this.show_bound_ = new_show;
        this.maintain(animate);
    }

    width(new_width, animate = false) {
        if (typeof(new_width) === "undefined")
            return this.width_;
        this.position_flag_ = true;
        this.width_ = new_width;
        this.maintain(animate);
    }

    height(new_height, animate = false) {
        if (typeof(new_height) === "undefined")
            return this.height_;
        this.position_flag_ = true;
        this.height_ = new_height;
        this.maintain(animate);
    }

    value(new_value, animate = false) {
        if (typeof(new_value) === "undefined")
            return this.value_;
        this.position_flag_ = true;
        this.opacity_flag_ = true;
        this.value_ = new_value;
        this.maintain(animate);
    }

    maintain(animate = false) {
        // position & layout
        if (this.position_flag_) {
            this.position_flag_ = false;
            if (this.width_ === 0 || this.height_ === 0)
                return;
            let rw = this.value_.width_ / this.width_;
            let rh = this.value_.height_ / this.height_;
            if (rw > rh) {
                let expect_width = this.width_ / this.spare_rate_;
                this.value_.width(expect_width, animate);
            } else {
                let expect_height = this.height_ / this.spare_rate_;
                this.value_.height(expect_height, animate);
            }
            this.maintain_layout(this.x_, this.y_, this.width_, this.height_, this.value_, animate);
            create_handle(this.bound_, animate).width(this.width_);
            create_handle(this.bound_, animate).height(this.height_);
            create_handle(this.bound_, animate).x(this.x_);
            create_handle(this.bound_, animate).y(this.y_);
        }
        
        // opacity
        if (this.opacity_flag_) {
            this.opacity_flag_ = false;
            create_handle(this.bound_, animate).stroke({ opacity: (this.show_bound_ ? this.opacity_ : 0 )});
            this.value_.opacity(this.opacity_, animate);
        }
    }
}

export const ElementContainer = (value) => {
    Layout(value);
    value.element_width_ = 25;
    value.element_height_ = 25;
    value.spare_rate_ = 1.2;
    value.show_bounds_ = true;

    value.element_height = (new_element_height, animate = false) => {
        if (typeof(new_element_height) === "undefined")
            return value.element_height_;
        value.element_height_ = new_element_height;
        value.maintain(animate);
    }

    value.element_width = (new_element_width, animate = false) => {
        if (typeof(new_element_width) === "undefined")
            return value.element_width_;
        value.element_width_ = new_element_width;
        value.maintain(animate);
    }

    value.show_bound = (show, animate = false) => {
        if (typeof(show) === "undefined")
            return value.show_bounds_;
        value.show_bounds_ = show;
        value.maintain(animate);
    }
}