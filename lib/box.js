import { IBox } from "./i_box";
import { Color } from "./color";
import { Rect } from "./rect";
import { Util } from "./utility";
import { IContainer } from "./i_container";
import { Anitype, IAnimation } from "./i_animation";

export class Box {
    constructor(svg, value = null) {
        IBox(this);
        IAnimation(this);
        IContainer(this);

        this._rate = 1.2;
        this._fix_width = true;
        this._fix_height = true;
        this._group = svg.append("g");
        this._bound = new Rect(this._group);
        this.value(value, Anitype.none);
    }

    _update_value(animate = Anitype.none) {
        if (this._value === null || 
            this.width() === 0 || 
            this.height() === 0) return;
        if (this._fix_width && this._fix_height) {
            let rw = this._value.width() / this.width();
            let rh = this._value.height() / this.height();
            if (rw > rh) this._value.width(this.width() / this.rate());
            else this._value.height(this.height() / this.rate());
        } else if (this._fix_height) {
            this._value.height(this.height() / this.rate());
        } else if (this._fix_width) {
            this._value.width(this.width() / this.rate());
        }
        this._update_layout(this._value, animate);
    }

    fix_height(flag, animate = Anitype.none) {
        if (typeof(flag) === "undefined")
            return this._fix_height;
        this._fix_height = flag;
        this._update_value(animate);
    }

    fix_width(flag, animate = Anitype.none) {
        if (typeof(flag) === "undefined")
            return this._fix_width;
        this._fix_width = flag;
        this._update_value(animate);
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined")
            return this._bound.x();
        this._bound.x(new_x, animate);
        this._update_value(animate);
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined")
            return this._bound.y();
        this._bound.y(new_y, animate);
        this._update_value(animate);
    }

    width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this._bound.width();
        new_width = Math.max(new_width, 1);
        this._bound.width(new_width, animate);
        this._update_value(animate);
    }

    height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined")
            return this._bound.height();
        new_height = Math.max(new_height, 1);
        this._bound.height(new_height, animate);
        this._update_value(animate);
    }

    layout(new_layout, animate = Anitype.none) {
        if (typeof(new_layout) === "undefined")
            return this._layout;
        this._layout = new_layout;
        this._update_value(animate);
    }

    rate(new_rate, animate = Anitype.none) {
        if (typeof(new_rate) === "undefined")
            return this._rate;
        this._rate = new_rate;
        this._update_value(animate);
    }

    value(new_value, animate = Anitype.none) {
        if (typeof(new_value) === "undefined")
            return this._value;
        this._value = new_value;
        if (animate != Anitype.none) 
            this._value.opacity(0, Anitype.none);
        this._update_value(animate);
        if (animate != Anitype.none)
            this._value.opacity(1, Anitype.append);
    }

    opacity(new_opacity, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined")
            return this._bound.attr("opacity");
        if (new_opacity < 0) new_opacity = 0;
        if (new_opacity > 1) new_opacity = 1;
        this._bound.opacity(new_opacity, animate);
        if (this._value != null) {
            this._value.opacity(new_opacity, animate);
        }
    }
}