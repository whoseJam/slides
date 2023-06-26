
import { Box } from "./box";
import { Rect } from "./rect";
import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";

export class Grid {
    constructor(svg) {
        IBox(this);
        IAnimation(this);

        this._group = svg.append("g")
            .attr("x", 0)
            .attr("y", 0);
        this._grid = [[]];
        this._element_height = 30;
        this._element_width = 30;
        this._n = 0;
        this._m = 0;
    }

    idx(i, j) {
        return i * this._m + j;
    }

    element_height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined")
            return this._element_height;
        this._element_height = new_height;
        this._update_grid_position(animate);
    }

    element_width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this._element_width;
        this._element_width = new_width;
        this._update_grid_position(animate);
    }

    _update_grid_position(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        for (let i = 0; i < this.n(); i++) {
            for (let j = 0; j < this.m(); j++) {
                let x = j * this.element_width();
                let y = i * this.element_height();
                this._grid[i][j].x(x, mng.fir_status());
                this._grid[i][j].y(y, mng.sec_status());
            }
        }
        this._records.forEach((data) => {
            let x = data.j * this.element_width();
            let y = data.i * this.element_height();
            data.value.x(x, mng.fir_status());
            data.value.y(y, mng.sec_status());
        });
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined") 
            return this._group.attr("x");
        this._group.attr("x", new_x);
        this._update_grid_position(animate);
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined")
            return this._group.attr("y");
        this._group.attr("y", new_y);
        this._update_grid_position(animate);
    }

    n(new_n, animate = Anitype.none) {
        if (typeof(new_n) === "undefined")
            return this._n;
        if (this._n < new_n) {
            for (let i = 1; i <= new_n - this._n; i++) {
                let new_row = [];
                for (let j = 0; j < this._m; j++)
                    new_row.push(new Box(this._group));
                this._grid.push(new_row);
            }
        } else {
            for (let i = 1; i <= this._n - new_n; i++) {
                let del_row = this._grid.pop();
                del_row.forEach((data) => {
                    data.delete();
                })
            }
        }
    }

    m(new_m, animate = Anitype.none) {
        if (typeof(new_m) === "undefined")
            return this._m;
        this._m = new_m;
    }
  
    maintain(animate = false) {
        while (this.elements_.length < this.n_ * this.m_) {
            let empty_element = new Element(this.draw_);
            empty_element.width(this.element_width_);
            empty_element.height(this.element_height_);
            this.elements_.push(empty_element);
        }
        for (let i = 0; i < this.n_; i++) {
            for (let j = 0; j < this.m_; j++) {
                let x = this.x_ + j * this.element_width_;
                let y = this.y_ + i * this.element_height_;
                let element = this.elements_[this.idx(i, j)];
                element.x(x);
                element.y(y);
            }
        }
        this.records_.forEach((record) => {
            let element = this.elements_[this.idx(
                record.i_, 
                record.j_)];
            element.value(record.value_);
        });
        this.width_ = this.element_width_ * this.m_;
        this.height_ = this.element_height_ * this.n_;
    }

    color(i, j, color, animate = false) {
        let element = this.elements_[this.idx(i, j)];
        element.color(color, animate);
    }

    default_color(i, j, animate = false) {
        let element = this.elements_[this.idx(i, j)];
        element.default_color(animate);
    }

    value(i, j, value, animate = false) {
        let element = this.elements_[this.idx(i, j)];
        element.value(value, animate);
    }
}