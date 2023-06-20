import { Box } from "#lib/box.js";
import { Basic } from "#lib/basic.js";
import { BasicLine } from "#lib/basic_line.js";
import { create_handle } from "#lib/utility.js";

export class Line {
    constructor(draw, geo) {
        Box(this);
        Basic(this);
        BasicLine(this, draw);

        this.geo_ = geo;
        this.draw_ = draw;
        this.line_ = draw.line().stroke({ color: "#000000", width: 1 });
        this.point_s_ = Object();
        this.point_e_ = Object();
    }

    dvx(delta, animate = false) {
        this.position_flag_ = true;
        this.point_s_.dvx(delta);
        this.point_e_.dvx(delta);
        this.geo_.maintain(animate);
    }

    dvy(delta, animate = false) {
        this.position_flag_ = true;
        this.point_s_.dvy(delta);
        this.point_e_.dvy(delta);
        this.geo_.maintain(animate);
    }

    point_s(new_point_s, animate = false) {
        if (typeof(new_point_s) === "undefined")
            return this.point_s_;
        this.position_flag_ = true;
        this.point_s_ = new_point_s;
        this.maintain(animate);
    }

    point_e(new_point_e, animate = false) {
        if (typeof(new_point_e) === "undefined") 
            return this.point_e_;
        this.position_flag_ = true;
        this.point_e_ = new_point_e;
        this.maintain(animate);
    }

    maintain(animate = false) {
        let sx = this.point_s_.x_;
        let sy = this.point_s_.y_;
        let ex = this.point_e_.x_;
        let ey = this.point_e_.y_;
        let dx = ex - sx;
        let dy = ey - sy;
        let len = Math.sqrt(dx * dx + dy * dy);
        dx /= len; dy /= len;
        let max_x = this.geo_.max_x();
        let max_y = this.geo_.max_y();
        let min_x = this.geo_.min_x();
        let min_y = this.geo_.min_y();

        // box
        this.x_ = Math.min(sx, ex);
        this.y_ = Math.min(sy, ey);
        this.width_ = Math.max(sx, ex) - this.x_;
        this.height_ = Math.max(sy, ey) - this.y_;

        // position
        let move_s = false;
        let move_e = false;
        if (this.position_flag_ || this.point_s_.position_flag_ || this.point_e_.position_flag_) {
            this.position_flag_ = false;
            this.point_s_.position_flag_ = false;
            this.point_e_.position_flag_ = false;
            let k = 0;
            if (sx < min_x && Math.abs(k) < Math.abs((min_x - sx) / dx)) k = (min_x - sx) / dx;
            if (sx > max_x && Math.abs(k) < Math.abs((max_x - sx) / dx)) k = (max_x - sx) / dx;
            if (sy < min_y && Math.abs(k) < Math.abs((min_y - sy) / dy)) k = (min_y - sy) / dy;
            if (sy > max_y && Math.abs(k) < Math.abs((max_y - sy) / dy)) k = (max_y - sy) / dy;
            if (k > 0.001) move_s = true;
            sx += k * dx; sy += k * dy; k = 0;
            if (ex < min_x && Math.abs(k) < Math.abs((min_x - ex) / dx)) k = (min_x - ex) / dx;
            if (ex > max_x && Math.abs(k) < Math.abs((max_x - ex) / dx)) k = (max_x - ex) / dx;
            if (ey < min_y && Math.abs(k) < Math.abs((min_y - ey) / dy)) k = (min_y - ey) / dy;
            if (ey > max_y && Math.abs(k) < Math.abs((max_y - ey) / dy)) k = (max_y - ey) / dy;
            if (k > 0.001) move_e = true;
            ex += k * dx; ey += k * dy; k = 0;
            create_handle(this.line_, animate).plot(sx, sy, ex, ey);
        }
        
        // opacity
        if (this.opacity_flag_) {
            this.opacity_flag_ = false;
            create_handle(this.line_, animate).opacity(this.opacity_);
        }

        // arrow
        if (this.arrow_flag_) {
            this.arrow_flag_ = false;
            create_handle(this.line_, animate).marker("start", (this.arrow_s_ && !move_s) ? this.arrow_marker_ : this.empty_marker_);
            create_handle(this.line_, animate).marker("end", (this.arrow_e_ && !move_e) ? this.arrow_marker_ : this.empty_marker_);
        }
    }
}