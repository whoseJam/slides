
import { Box } from "#lib/box.js";
import { Line } from "#lib/line.js";
import { Point } from "#lib/point.js";

export class Geometry {
    constructor(draw) {
        Box(this);
        this.draw_ = draw;
        this.items = [];
        this.width_ = 300;
        this.height_ = 300;
        this.bound_min_x_ = -5;
        this.bound_max_x_ = 5;
        this.bound_min_y_ = -5;
        this.bound_max_y_ = 5; 
    }

    width(new_width, animate = false) {
        if (typeof(new_width) === "undefined")
            return this.width_;
        this.width_ = new_width;
        this.maintain(animate);
    }

    height(new_height, animate = false) {
        if (typeof(new_height) === "undefined")
            return this.height_;
        this.height_ = new_height;
        this.maintain(animate);
    }

    maintain(animate = false) {
        this.items.forEach((item) => {
            if (item instanceof Line) {
                item.maintain(animate);
                return;
            }
            let x = this.x_ + (this.width_ / (this.bound_max_x_ - this.bound_min_x_)) * (item.vx_ - this.bound_min_x_);
            let y = this.y_ + (this.height_ / (this.bound_max_y_ - this.bound_min_y_)) * (this.bound_max_y_ - item.vy_);
            item.x(x, animate);
            item.y(y, animate);
        });
    }

    bound_min_x(new_bound, animate = false) {
        if (typeof(new_bound) === "undefined")
            return this.bound_min_x_;
        this.bound_min_x_ = new_bound;
        this.maintain(animate);
    }

    bound_max_x(new_bound, animate = false) {
        if (typeof(new_bound) === "undefined")
            return this.bound_max_x_;
        this.bound_max_x_ = new_bound;
        this.maintain(animate);
    }

    bound_min_y(new_bound, animate = false) {
        if (typeof(new_bound) === "undefined")
            return this.bound_min_y_;
        this.bound_min_y_ = new_bound;
        this.maintain(animate);
    }

    bound_max_y(new_bound, animate = false) {
        if (typeof(new_bound) === "undefined")
            return this.bound_max_y_;
        this.bound_max_y_ = new_bound;
        this.maintain(animate);
    }

    create_line_by_cartesian(x1, y1, x2, y2) {
        let p1 = new Point(this.draw_, this);
        let p2 = new Point(this.draw_, this);
        let l = new Line(this.draw_, this);
        p1.vx(x1); p1.vy(y1);
        p2.vx(x2); p2.vy(y2);
        l.point_s(p1);
        l.point_e(p2);
        this.items.push(p1);
        this.items.push(p2);
        this.items.push(l);
        this.maintain();
        return l;
    }

    create_line_by_polar(r, theta) {
        return this.create_line_by_cartesian(
            0, 0, r * Math.cos(theta), r * Math.sin(theta));
    }

    create_axis(axis_length = 5) {
        let x = this.create_line_by_cartesian(-axis_length, 0, axis_length, 0);
        x.arrow_e(true);
        let y = this.create_line_by_cartesian(0, -axis_length, 0, axis_length);
        y.arrow_e(true);
    }
}