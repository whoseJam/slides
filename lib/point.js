
import { Box } from "#lib/box.js";

export class Point {
    constructor(draw, geo) {
        Box(this);
        this.geo_ = geo;
        this.draw_ = draw;
        this.vx_ = 0;
        this.vy_ = 0;
    }

    dvx(delta) {
        this.position_flag_ = true;
        this.vx_ += delta;
    }

    dvy(delta) {
        this.position_flag_ = true;
        this.vy_ += delta;
    }

    vx(new_vx) {
        if (typeof(new_vx) === "undefined")
            return this.vx_;
        this.position_flag_ = true;
        this.vx_ = new_vx;
    }

    vy(new_vy) {
        if (typeof(new_vy) === "undefined")
            return this.vy_;
        this.position_flag_ = true;
        this.vy_ = new_vy;
    }

    maintain(animate = false) {
    }
}