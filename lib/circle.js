import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";
import { Color } from "./color";

export class Circle {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._register_animation_channel("_circle");
        this._circle = svg.append("circle")
            .attr("r", 20)
            .attr("fill", Color.white)
            .attr("fill-opacity", 1)
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("stroke", Color.black)
            .attr("stroke-opacity", 1);
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined") {
            let result = this._animation_check("_circle", "cx");
            return Number(result ? result : this._circle.attr("cx")) - this.radius();
        }
        this._animation_status(animate);
        this._animation("_circle")
            .attr("cx", new_x + this.radius());
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined") {
            let result = this._animation_check("_circle", "cy");
            return Number(result ? result : this._circle.attr("cy")) - this.radius();
        }
        this._animation_status(animate);
        this._animation("_circle")
            .attr("cy", new_y + this.radius());
    }

    width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this.radius() * 2;
        this.radius(new_width / 2, animate);
    }

    height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined")
            return this.radius() * 2;
        this.radius(new_height / 2, animate);
    }

    radius(new_radius, animate = Anitype.none) {
        if (typeof(new_radius) === "undefined") {
            let result = this._animation_check("_circle", "r");
            return Number(result ? result : this._circle.attr("r"));
        }
        this._animation_status(animate);
        this._animation("_circle")
            .attr("r", new_radius);
    }

    fill(new_color, animate = Anitype.none) {
        if (typeof(new_color) === "undefined") {
            let result = this._animation_check("_circle", "fill");
            return String(result ? result : this._circle.attr("fill"));
        }
        this._animation_status(animate);
        this._animation("_circle")
            .attr("fill", new_color);
    }

    fill_opacity(new_opacity, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_circle", "fill-opacity");
            return Number(result ? result : this._circle.attr("fill-opacity"));
        }
        this._animation_status(animate);
        this._animation("_circle")
            .attr("fill-opacity", new_opacity);
    }

    stroke(new_color, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_circle", "stroke");
            return String(result ? result : this._circle.attr("stroke"));
        }
        this._animation_status(animate);
        this._animation("_circle")
            .attr("stroke", new_color);
    }

    stroke_opacity(new_opacity, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_circle", "stroke-opacity");
            return Number(result ? result : this._circle.attr("stroke-opacity"));
        }
        this._animation_status(animate);
        this._animation("_circle")
            .attr("stroke-opacity", new_opacity);
    }

    color(new_color_pack, animate = Anitype.none) {
        if (typeof(new_color_pack) === "undefined") {
            return { main: this.fill(), border: this.stroke() };
        }
        let mng = this._animation_status(animate);
        this.stroke(new_color_pack.border, mng.fir_status());
        this.fill(new_color_pack.main, mng.sec_status());
    }

    opacity(new_opacity, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_circle", "opacity");
            return Number(result ? result : this._circle.attr("opacity"));
        }
        this._animation_status(animate);
        this._animation("_circle")
            .attr("opacity", new_opacity);
    }
}