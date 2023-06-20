import { Box } from "#lib/box.js";
import { Basic } from "#lib/basic.js";
import { BasicBound } from "#lib/basic_bound";
import { create_handle } from "#lib/utility";
import { create } from "svg.js";

export class Message {
    constructor(draw) {
        Box(this);
        Basic(this);
        BasicBound(this);

        this.min_x = () => { return this.show_bound_ ? this.x_ - (this.bound_rate_ - 1) * this.width_ / 2 : this.x_; };
        this.max_x = () => { return this.show_bound_ ? this.x_ + (this.bound_rate_ + 1) * this.width_ / 2 : this.x_ + this.width_; };
        this.min_y = () => { return this.show_bound_ ? this.y_ - (this.bound_rate_ - 1) * this.height_ / 2 : this.y_; };
        this.max_y = () => { return this.show_bound_ ? this.y_ + (this.bound_rate_ + 1) * this.height_ / 2 : this.y_ + this.height_; };

        this.draw_ = draw;
        this.rect_ = draw.rect(0, 0);
        this.rect_.stroke({ width: 1, opacity: 1, color: "#000000" });
        this.rect_.fill({ opacity: 0 });
        this.text_ = draw.text("null")
            .font({ family: "consolas", size: this.font_size_ })
            .x(0).y(0);
        this.message_ = null;
        this.font_size_ = 15;
        this.maintain();
    }

    message(new_message, animate = false) {
        if (typeof(new_message) === "undefined")
            return this.message_;
        this.position_flag_ = true;
        this.message_ = new_message;
        this.text_.text(new_message);
        this.maintain(animate);
    }

    maintain(animate = false) {
        // size
        create_handle(this.text_, animate).font({ size: this.font_size_ });
        let last_x = this.text_.x();
        let last_y = this.text_.y();
        this.text_.x(0);
        this.text_.y(0);
        this.width_ = this.text_.length();
        this.height_ = this.text_.cy() * 2;
        this.text_.x(last_x);
        this.text_.y(last_y);
 
        // position
        if (this.position_flag_) {
            this.position_flag_ = false;
            create_handle(this.text_, animate).x(this.x_);
            create_handle(this.text_, animate).y(this.y_);

            create_handle(this.rect_, animate).x(this.x_ - (this.bound_rate_ - 1) * this.width_ / 2);
            create_handle(this.rect_, animate).y(this.y_ - (this.bound_rate_ - 1) * this.height_ / 2);
            create_handle(this.rect_, animate).width(this.width_ * this.bound_rate_);
            create_handle(this.rect_, animate).height(this.height_ * this.bound_rate_);
        }

        // opacity
        if (this.opacity_flag_) {
            this.opacity_flag_ = false;
            // if (this.message_ === "系数表示多项式B(x)")
                console.log(this.show_bound_);
            create_handle(this.text_, animate).font({ opacity: this.opacity_ });
            create_handle(this.rect_, animate).stroke({ opacity: (this.show_bound_) ? this.opacity_ : 0 });
        }
    }

    width(new_width, animate = false) {
        if (typeof(new_width) === "undefined")
            return this.width_;
        let kw = this.width_ / this.font_size_;
        let new_font_size = new_width / kw;
        this.position_flag_ = true;
        this.font_size_ = new_font_size;
        this.maintain(animate);
    }

    height(new_height, animate = false) {
        if (typeof(new_height) === "undefined")
            return this.height_;
        let kh = this.height_ /this.font_size_;
        let new_font_size = new_height / kh;
        this.position_flag_ = true;
        this.font_size_ = new_font_size;
        this.maintain(animate);
    }
}