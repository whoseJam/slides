import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";

export class Text {
    constructor(svg, message = "empty") {
        IBox(this);
        IAnimation(this);

        this._register_animation_channel("_text");
        this._text = svg.append("text")
            .text(message)
            .attr("text-anchor", "start")
            .attr("dy", ".71em")
            .attr("x", 0)
            .attr("y", 0)
            .attr("font-size", 15)
            .attr("font-family", "consolas");
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined") {
            let result = this._animation_check("_text", "x");
            return Number(result ? result : this._text.attr("x"));
        }
        this._animation_status(animate);
        this._animation("_text")
            .attr("x", new_x);
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined") {
            let result = this._animation_check("_text", "y");
            return Number(result ? result : this._text.attr("y"));
        }
        this._animation_status(animate);
        this._animation("_text")
            .attr("y", new_y);
    }

    font_size(new_font_size, animate = Anitype.none) {
        if (typeof(new_font_size) === "undefined") {
            let result = this._animation_check("_text", "font-size");
            return Number(result ? result : this._text.attr("font-size"));
        }
        new_font_size = Math.max(new_font_size, 1);
        this._height = new_font_size / this.font_size() * this.height();
        this._width = new_font_size / this.font_size() * this.width();
        this._animation_status(animate);
        this._animation("_text")
            .attr("font-size", new_font_size);
    }

    font_famliy(new_family) {
        if (typeof(new_family) === "undefined")
            return this._text.attr("font-family");
        this._text.attr("font-family", new_family);
    }

    text(new_text, animate = Anitype.none) {
        if (typeof(new_text) === "undefined") {
            let result = this._animation_check("_text", "text");
            return String(result ? result : this._text.text());
        }
        this.opacity(0, animate);
        this._animation_status(Anitype.start);
        this._animation("_text")
            .text(new_text)
            .attr("opacity", 1);
    }

    width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined") {
            if (typeof(this._width) === "undefined")
                return Number(this._text.node().getBBox().width);
            return this._width;
        }
        new_width = Math.max(new_width, 1);
        let kw = this.width() / this.font_size();
        let new_font_size = new_width / kw;
        this.font_size(new_font_size, animate);
    }

    height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined") {
            if (typeof(this._height) === "undefined")
                return Number(this._text.node().getBBox().height);
            return this._height;
        }
        new_height = Math.max(new_height, 1);
        let kh = this.height() / this.font_size();
        let new_font_size = new_height / kh;
        this.font_size(new_font_size, animate);
    }

    opacity(new_opacity, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_text", "opacity");
            return Number(result ? result : this._text.attr("opacity"));
        }
        if (new_opacity < 0) new_opacity = 0;
        if (new_opacity > 1) new_opacity = 1;
        this._animation_status(animate);
        this._animation("_text")
            .attr("opacity", new_opacity);
    }

    fill(new_color, animate = Anitype.none) {
        if (typeof(new_color) === "undefined") {
            let result = this._animation_check("_text", "fill");
            return String(result ? result : this._text.attr("fill"));
        }
        this._animation_status(animate);
        this._animation("_text")
            .attr("fill", new_color);
    }

    delete() {
        this._text.remove();
    }
}