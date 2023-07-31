
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
        this._x = 0;
        this._y = 0;
    }

    idx(i, j) {
        return i * this._m + j;
    }

    element_height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined")
            return this._element_height;
        this._element_height = new_height;
        this._update_box(animate);
    }

    element_width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this._element_width;
        this._element_width = new_width;
        this._update_box(animate);
    }

    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined") 
            return this._x;
        this._x = new_x;
        this._update_box(animate);
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined")
            return this._y;
        this._y =new_y;
        this._update_box(animate);
    }

    width(new_width, animate = Anitype.none) {
        return this._element_width * this._m;
    }

    height(new_height, animate = Anitype.none) {
        return this._element_height * this._n;
    }

    _update_box(animate = Anitype.none) {
        let mng = this._animation_status(animate);
        for (let i = 0; i < this._n; i++) {
            for (let j = 0; j < this._m; j++) {
                let x = this._element_width * j + this._x;
                let y = this._element_height * i + this._y;
                this._grid[i][j].x(x, mng.fir_status);
                this._grid[i][j].y(y, mng.sec_status);
                this._grid[i][j].width(this._element_width, mng.sec_status);
                this._grid[i][j].height(this._element_height, mng.sec_status);
            }
        }
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
        }
        this._n = new_n;
        this._update_box(animate);
    }

    m(new_m, animate = Anitype.none) {
        if (typeof(new_m) === "undefined")
            return this._m;
        if (this._m < new_m) {
            for (let i = 0; i < this._n; i++) {
                console.log(this._grid[i]);
                for (let j = 1; j <= new_m - this._m; j++) {
                    this._grid[i].push(new Box(this._group));
                }
            }
        }
        this._m = new_m;
        this._update_box(animate);
    }

    color(i, j, color_pack, animate = Anitype.none) {
        let element = this._grid[i][j];
        element.color(color_pack, animate);
    }

    value(i, j, value, animate = Anitype.none) {
        let element = this._grid[i][j];
        console.log(this._grid);
        console.log(element);
        element.value(value, animate);
    }
}