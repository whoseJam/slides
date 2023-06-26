import { Box } from "./box";
import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";

export class Stack {
    constructor(svg) {
        IBox(this);
        IAnimation(this);
        
        this._elements_group = svg.append("g");
        this._elements = [];
        this._element_width = 30;
        this._element_height = 30;
        this._expand_dir = 1;
        this._fix_height = true;
        this._x = 0;
        this._y = 0;
    }

    _update_element_position(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        let dir = this.expand_direction();
        let cur = this._y;
        this._elements.forEach((element) => {
            element.x(this._x, mng.fir_status());
            element.y(cur, mng.sec_status());
            element.fix_height(this._fix_height, mng.sec_status());
            element.width(this._element_width, mng.sec_status());
            if (this._fix_height)
                element.height(this._element_height, mng.sec_status());
            cur += dir * element.height();
        });
    }

    expand_direction(dir, animate = Anitype.none) {
        if (typeof(dir) === "undefined")
            return this._expand_dir;
        this._expand_dir = dir;
        this._update_element_position(animate);
    }

    element_height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined") {
            if (this._fix_height) return this._element_height;
            return null;
        }
        this._element_height = new_height;
        this._fix_height = true;
        this._update_element_position(animate);
    }

    element_width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this._element_width;
        this._element_width = new_width;
        this._update_element_position(animate);
    }

    fix_height(flag, animate = Anitype.none) {
        if (typeof(flag) === "undefined")
            return this._fix_height;
        this._fix_height = flag;
        this._update_element_position(animate);
    }

    height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined") {
            return this._elements.reduce((prev, cur) => {
                return cur.height() + prev;
            });
        }
        this.element_height(new_height / this._elements.length, animate);
    }

    width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this.element_width();
        this.element_width(new_width, animate);
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined")
            return this._x;
        this._x = new_x;
        this._update_element_position(animate);
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined")
            return this._y;
        this._y = new_y;
        this._update_element_position(animate);
    }

    push(value, animate = Anitype.none) {
        let mng = this._animation_status(animate);
        let element = new Box(this._elements_group, value);
        this._elements.push(element);
        this._update_element_position();
        if (animate) {
            element.opacity(0);
            element.opacity(1, mng.fir_status());
        }
    }

    pop(animate = Anitype.none) {
        let element = this._elements.pop();
        element.opacity(0, animate);
    }
}