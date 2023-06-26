import * as d3 from "d3";
import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";

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
    }
    
    x(new_x, animate = Anitype.none) {
        if (typeof(new_x) === "undefined")
            return this._x;
        this._x = new_x;
        this._update_center();
    }

    y(new_y, animate = Anitype.none) {
        if (typeof(new_y) === "undefined")
            return this._y;
        this._y = new_y;
        this._update_center();
    }

    height(new_height, animate = Anitype.none) {
        if (typeof(new_height) === "undefined")
            return this._height;
        this._height = new_height;
        this._update_center();
    }

    width(new_width, animate = Anitype.none) {
        if (typeof(new_width) === "undefined")
            return this._width;
        this._width = new_width;
        this._update_center();
    }

    add(new_element) {
        new_element.cx(this.cx());
        new_element.cy(this.cy());
        this._elements.push({ 
            value: new_element,
            x: this.cx(),
            y: this.cy()
        });
        let elements = this._elements_group
            .selectAll("*")
            .data(this._elements);
        elements.enter().append("g").each((data) => {
            data.value.cx(data.x);
            data.value.cy(data.y);
        });
        this._simulation = d3.forceSimulation()
            .force('manybody', d3.forceManyBody().strength(-10))
            .force('center', d3.forceCenter(this.cx(), this.cy()))
            .nodes(this._elements)
            .on("tick", () => {
                let elements = this._elements_group
                    .selectAll("*")
                    .data(this._elements);
                elements.each((data) => {
                    data.x = Math.min(Math.max(data.x, this.x()), this.mx());
                    data.y = Math.min(Math.max(data.y, this.y()), this.my());
                    data.value.cx(data.x);
                    data.value.cy(data.y);
                });
            })
    }
}