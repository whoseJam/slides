import { Box } from "./box";
import { IBox } from "./i_box";
import { Anitype, IAnimation } from "./i_animation";

export class Scatter {
    constructor(svg) {
        IBox(this);
        IAnimation(this);
        
        this._elements = [];
        this._elements_group = svg.append("g");
    }

    add(new_element, animate = Anitype.none) {
        this._elements.push(new_element);
        let simulation = d3.forceSimulation(this._elements)
            .force("charge", d3.forceManyBody())
            .force("collision", d3.forceCollide()
                .radius(d => Math.min(d.height(), d.width())))
            .force("y", d3.forceY(this.cy()));
        simulation.on("tick", () => {
            let elements = this._elements_group
                .selectAll("*")
                .data(this._elements);
            elements.enter()
                .append("g")
                .each((node) => {
                    node.cx();
                })
                
        })
    }
}