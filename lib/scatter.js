import * as d3 from "d3";
import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";

const SCATTER_ALPHA = 1.0;

/**
 * Scatter里面的元素被存储在_elements里面，包括三个属性
 *   - x: 元素的x坐标
 *   - y: 元素的y坐标
 *   - value_handle: 元素的value，如果元素是空元素，则value_handle为null
 */
export class Scatter {
    constructor(svg) {
        IBox(this);
        IAnimation(this);
        
        this._elements = [];
        this._elements_group = svg.append("g");
        this._x = 0;
        this._y = 0;
        this._height = 100;
        this._width = 100;
        this._simulation = d3.forceSimulation()
            .nodes(this._elements)
            .on("tick", () => {
                this._elements.forEach((ele) => {
                    ele.x = Math.min(Math.max(ele.x, this.x()), this.mx());
                    ele.y = Math.min(Math.max(ele.y, this.y()), this.my());
                    if (ele.value_handle !== null) {
                        ele.value_handle.cx(ele.x);
                        ele.value_handle.cy(ele.y);
                    }
                });
            });
    }

    _center_force() {
        return d3.forceCenter(this.cx(), this.cy()).strength(0.05);
    }

    _many_body_force() {
        return d3.forceManyBody().strength(-10);
    }
    
    x(new_x) {
        if (typeof(new_x) === "undefined")
            return this._x;
        this._x = new_x;
        this._update();
    }

    y(new_y) {
        if (typeof(new_y) === "undefined")
            return this._y;
        this._y = new_y;
        this._update();
    }

    height(new_height) {
        if (typeof(new_height) === "undefined")
            return this._height;
        this._height = new_height;
        this._update();
    }

    width(new_width) {
        if (typeof(new_width) === "undefined")
            return this._width;
        this._width = new_width;
        this._update();
    }

    _update() {
        this._simulation = this._simulation
            .alpha(SCATTER_ALPHA)
            .force('center', this._center_force())
            .force('manybody', this._many_body_force())
            .nodes(this._elements)
            .restart();
    }

    add(new_element) {
        new_element.cx(this.cx());
        new_element.cy(this.cy());
        this._elements.push({ 
            value_handle: new_element,
            x: this.cx() + Math.random() - 0.5,
            y: this.cy() + Math.random() - 0.5
        });
        this._update();
    }

    delete() {
        this._elements.forEach((ele) => {
            ele.delete();
        });
    }
}