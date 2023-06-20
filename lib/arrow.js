
import { Box } from "#lib/box.js";
import { Basic } from "#lib/basic.js";
import { BasicLine } from "#lib/basic_line.js";
import { create_handle } from "#lib/utility.js";

export class Arrow {
    constructor(draw) {
        Box(this);
        Basic(this);
        BasicLine(this, draw);

        this.line_ = draw.line().stroke({ color: "#000000", width: 1 });
        this.draw_ = draw;
        this.start_x_ = 0;
        this.start_y_ = 0;
        this.end_x_ = 0;
        this.end_y_ = 0;
        this.last_x_ = 0;
        this.last_y_ = 0;
    }

    start(new_start, animate = false) {
        if (typeof(new_start) === "undefined")
            return [this.start_x_, this.start_y_];
        this.position_flag_ = true;
        this.start_x_ = new_start[0];
        this.start_y_ = new_start[1];
        this.maintain(animate);
    }

    end(new_end, animate = false) {
        if (typeof(new_end) === "undefined")
            return [this.end_x_, this.end_y_];
        this.position_flag_ = true;
        this.end_x_ = new_end[0];
        this.end_y_ = new_end[1];
        this.maintain(animate);
    }

    maintain(animate = false) {
        // position
        if (this.position_flag_) {
            this.position_flag_ = false;
            let delta_x = this.x_ - this.last_x_; this.last_x_ = this.x_;
            let delta_y = this.y_ - this.last_y_; this.last_y_ = this.y_;
            if (Math.abs(delta_x) < 0.001 && Math.abs(delta_y) < 0.001) {
                this.x_ = Math.min(this.start_x_, this.end_x_);
                this.y_ = Math.min(this.start_y_, this.end_y_);
                this.width_ = Math.max(this.start_x_, this.end_x_) - this.x_;
                this.height_ = Math.max(this.start_y_, this.end_y_) - this.y_;
            }
            this.start_x_ += delta_x; this.end_x_ += delta_x;
            this.start_y_ += delta_y; this.end_y_ += delta_y;
            create_handle(this.line_, animate).plot(this.start_x_, this.start_y_, this.end_x_, this.end_y_);
        }

        // opacity
        if (this.opacity_flag_) {
            this.opacity_flag_ = false;
            create_handle(this.line_, animate).opacity(this.opacity_);
        }

        // arrow
        if (this.arrow_flag_) {
            this.arrow_flag_ = false;
            create_handle(this.line_, animate).marker("start", this.arrow_s_ ? this.arrow_marker_ : this.empty_marker_);
            create_handle(this.line_, animate).marker("end", this.arrow_e_ ? this.arrow_marker_ : this.empty_marker_);
        }
    }
}