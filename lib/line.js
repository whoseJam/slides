import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";
import { Color } from "./color";
import * as d3 from "d3";

export class Line {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._marker_id = "arrow" + String(Math.random())
        this._register_animation_channel("_line");
        this._group = svg.append("g");
        this._group.append("marker")
            .attr("id", this._marker_id)
            .attr("markerUnits", "strokeWidth")
            .attr("viewBox", "0 0 12 12")
            .attr("refX", 6)
            .attr("refY", 6)
            .attr("markerWidth", 12)
            .attr("markerHeight", 12)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
            .attr("fill", Color.black);
        this._line = this._group.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", 0)
            .attr("opacity", 1)
            .attr("line-width", 1)
            .attr("stroke", Color.black);
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined")
            return Math.min(this.x1(), this.x2());
        let mng = this._animation_status(animate);
        let delta = new_x - this.x();
        this.x1(this.x1() + delta, mng.fir_status());
        this.x2(this.x2() + delta, mng.sec_status());
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined") 
            return Math.min(this.y1(), this.y2());
        let mng = this._animation_status(animate);
        let delta = new_y - this.y();
        this.y1(this.y1() + delta, mng.fir_status());
        this.y2(this.y2() + delta, mng.sec_status());
    }

    x1(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined") {
            let result = this._animation_check("_line", "x1");
            return Number(result ? result : this._line.attr("x1"));
        }
        this._animation_status(animate);
        this._animation("_line")
            .attr("x1", new_x);
    }

    y1(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined") {
            let result = this._animation_check("_line", "y1");
            return Number(result ? result : this._line.attr("y1"));
        }
        this._animation_status(animate);
        this._animation("_line")
            .attr("y1", new_y);
    }

    x2(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined") {
            let result = this._animation_check("_line", "x2");
            return Number(result ? result : this._line.attr("x2"));
        }
        this._animation_status(animate);
        this._animation("_line")
            .attr("x2", new_x);
    }

    y2(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined") {
            let result = this._animation_check("_line", "y2");
            return Number(result ? result : this._line.attr("y2"));
        }
        this._animation_status(animate);
        this._animation("_line")
            .attr("y2", new_y);
    }

    width() {
        return Math.abs(this.x1() - this.x2());
    }

    height() {
        return Math.abs(this.y1() - this.y2());
    }

    opacity(new_opacity, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_line", "opacity");
            return Number(result ? result : this._line.attr("opacity"));
        }
        this._animation_status(animate);
        this._animation("_line")
            .attr("opacity", new_opacity);
    }

    stroke(new_color, animate = Anitype.none) {
        if (typeof(new_opacity) === "undefined") {
            let result = this._animation_check("_line", "stroke");
            return String(result ? result : this._line.attr("stroke"));
        }
        this._animation_status(animate);
        this._animation("_line")
            .attr("stroke", new_color);
    }

    arrow() {
        this._line.attr("marker-end", "url(#" + this._marker_id + ")");
    }

    double_arrow() {
        this._line
            .attr("marker-start", "url(#arrow)")
            .attr("marker-end", "url(#arrow)");
    }

    delete() {
        this._group.remove();
    }
}