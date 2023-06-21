import { Box } from "#lib/box.js";
import { Basic } from "#lib/basic.js";

export class Scatter {
    constructor(draw) {
        Box(this);
        Basic(this);

        this.draw_ = draw;
        this.values_ = [];
        this.width_ = 900;
        this.height_ = 450;
        this.group_add_ = false;
        this.group_buffer_ = [];

        this.dx = (delta, animate = false) => {
            this.last_x_ = this.x_;
            this.x_ += delta;
            this.values_.forEach((value) => {
                value.dx(delta, animate);
            });
        };

        this.dy = (delta, animate = false) => {
            this.last_y_ = this.y_;
            this.y_ += delta;
            this.values_.forEach((value) => {
                value.dy(delta, animate);
            });
        };
    }

    start_group_add() {
        this.group_add_ = true;
    }

    stop_group_add(animate = false) {
        this.group_add_ = false;
        this.group_buffer_.forEach((value) => {
            this.values_.push(value);
            value.cx(this.cx());
            value.cy(this.cy());
        });
        this.group_buffer_ = [];
        this.maintain(animate);
    }

    add(value, animate = false) {
        if (this.group_add_) {
            this.group_buffer_.push(value);
            return;
        }
        this.values_.push(value);
        value.cx(this.cx());
        value.cy(this.cy());
        this.maintain(animate);
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
        let cnt = 1, boxes = [], idxes = [];
        this.values_.forEach((value, idx) => {
            boxes.push(value.test_box());
            idxes.push(idx);
        });
        while (cnt <= 400) {
            let finish = true;
            for (let i = 1; i < idxes.length; i++) {
                let p = Math.floor(Math.random() * (i - 0.5));
                let tmp = idxes[p]; idxes[p] = idxes[i]; idxes[i] = tmp;
            }
            for (let i = 0; i < boxes.length; i++)
                if (this.test_maintain(boxes, idxes[i], animate)) finish = false;
            if (finish) break;
            cnt++;
        }
        this.values_.forEach((value, idx) => {
            value.x(boxes[idx].x_, animate);
            value.y(boxes[idx].y_, animate);
            value.width(boxes[idx].width_, animate);
            value.height(boxes[idx].height_, animate);
        });
    }

    test_maintain(boxes, idx) {
        let len = boxes.length;
        let a = boxes[idx];
        let total_weight = 0;
        let direction = [], weight = [];
        for (let i = 0; i < len; i++) {
            if (i == idx) continue;
            let b = boxes[i];
            let cx1 = Math.max(a.min_x(), b.min_x());
            let cy1 = Math.max(a.min_y(), b.min_y());
            let cx2 = Math.min(a.max_x(), b.max_x());
            let cy2 = Math.min(a.max_y(), b.max_y());
            if (cx1 >= cx2 || cy1 >= cy2) continue;
            let w = (cx2 - cx1) * (cy2 - cy1);
            total_weight += w;
            weight.push(w);
            let tx = a.cx() - b.cx();
            let ty = a.cy() - b.cy();
            let len = Math.sqrt(tx * tx + ty * ty);
            if (Math.abs(len) < 1e-7) {
                let p = Math.random();
                if (p <= 0.25) tx = 1, ty = 0;
                else if (p <= 0.5) tx = -1, ty = 0;
                else if (p <= 0.75) tx = 0, ty = 1;
                else tx = 0, ty = -1;
                len = 1;
            }
            tx /= len; ty /= len;
            direction.push([tx, ty]);
        }
        if (a.min_x() < this.min_x()) { let w = (this.inner_min_x() - a.min_x()) * this.width_; weight.push(w); total_weight += w; direction.push([1, 0]); } 
        if (a.max_x() > this.max_x()) { let w = (a.max_x() - this.inner_max_x()) * this.width_; weight.push(w); total_weight += w; direction.push([-1, 0]); }
        if (a.min_y() < this.min_y()) { let w = (this.inner_min_y() - a.min_y()) * this.height_; weight.push(w); total_weight += w; direction.push([0, 1]); }
        if (a.max_y() > this.max_y()) { let w = (a.max_y() - this.inner_max_y()) * this.height_; weight.push(w); total_weight += w; direction.push([0, -1]); }
        let dx = 0, dy = 0;
        len = weight.length;
        if (len === 0) return false;
        if (Math.abs(total_weight) < 1e-7) total_weight = 1;
        for (let i = 0; i < len; i++) {
            dx += weight[i] / total_weight * direction[i][0];
            dy += weight[i] / total_weight * direction[i][1];
        }
        dx += Math.random() * 1 - 0.5;
        dy += Math.random() * 1 - 0.5;
        a.test_dx(dx);
        a.test_dy(dy);
        return true;
    }

    inner_min_x() {
        return this.x_ + this.line_width_;
    }

    inner_max_x() {
        return this.x_ + this.width_ - this.line_width_;
    }

    inner_min_y() {
        return this.y_ + this.line_width_;
    }

    inner_max_y() {
        return this.y_ + this.height_ - this.line_width_;
    }
}