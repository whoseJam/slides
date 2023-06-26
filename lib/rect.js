import { Color } from "./color";
import { Anitype, IAnimation } from "./i_animation";
import { IBox } from "./i_box";

export class Rect {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._register_animation_channel("_rect");
        this._rect = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", Color.white)
            .attr("fill-opacity", 1)
            .attr("stroke", Color.black)
            .attr("stroke-opacity", 1);
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined") {
            let result = this._animation_check("_rect", "x");
            return Number(result ? result : this._rect.attr("x"));
        }
        this._animation_status(animate);
        this._animation("_rect")
            .attr("x", new_x);
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined") {
            let result = this._animation_check("_rect", "y");
            return Number(result ? result : this._rect.attr("y"));
        }
        this._animation_status(animate);
        this._animation("_rect")
            .attr("y", new_y);
    }

    width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined") {
            let result = this._animation_check("_rect", "width");
            return Number(result ? result : this._rect.attr("width"));
        }
        this._animation_status(animate);
        this._animation("_rect")
            .attr("width", new_width);
    }

    height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined") {
            let result = this._animation_check("_rect", "height");
            return Number(result ? result : this._rect.attr("height"));
        }
        this._animation_status(animate);
        this._animation("_rect")
            .attr("height", new_height);
    }

    fill(new_color, animate = Anitype.none) {
        if (typeof(new_color) === "undefined") {
            let result = this._animation_check("_rect", "fill");
            return String(result ? result : this._rect.attr("fill"));
        }
        this._animation_status(animate);
        this._animation("_rect")
            .attr("fill", new_color);
    }

    fill_opacity(new_opacity, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_rect", "fill-opacity");
            return Number(result ? result : this._rect.attr("fill-opacity"));
        }
        this._animation_status(animate);
        this._animation("_rect")
            .attr("fill-opacity", new_opacity);
    }

    stroke(new_color, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_rect", "stroke");
            return String(result ? result : this._rect.attr("stroke"));
        }
        this._animation_status(animate);
        this._animation("_rect")
            .attr("stroke", new_color);
    }

    stroke_opacity(new_opacity, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_rect", "stroke-opacity");
            return Number(result ? result : this._rect.attr("stroke-opacity"));
        }
        this._animation_status(animate);
        this._animation("_rect")
            .attr("stroke-opacity", new_opacity);
    }

    opacity(new_opacity, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_rect", "opacity");
            return Number(result ? result : this._rect.attr("opacity"));
        }
        this._animation_status(animate);
        this._animation("_rect")
            .attr("opacity", new_opacity);
    }
}