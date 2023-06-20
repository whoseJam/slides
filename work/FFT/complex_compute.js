import { pause } from "#lib/utility.js";
import { SVG } from "@svgdotjs/svg.js";
import { Geometry } from "#lib/geometry";

let draw = SVG().addTo("body").size(1200, 600);
let L = 120;

function complex_add() {
    let geo = new Geometry(draw);
    let begin_add = window.parent.document.getElementById("begin_add");
    let end_add = window.parent.document.getElementById("end_add");
    let target_y = (begin_add.offsetTop + end_add.offsetTop) / 2;
    geo.width(L);
    geo.height(L);
    geo.cx(900);
    geo.cy(target_y);
    geo.create_axis();
    let a1 = 1.5, a2 = 2;
    let b1 = 0.5, b2 = 3;
    geo.bound_max_x(5);
    geo.bound_min_x(-1);
    geo.bound_max_y(5);
    geo.bound_min_y(-1);
    let c1 = a1 + b1;
    let c2 = a2 + b2;
    let al = geo.create_line_by_cartesian(0, 0, a1, a2); al.arrow_e(true);
    let bl = geo.create_line_by_cartesian(0, 0, b1, b2); bl.arrow_e(true);
    let cl;
    pause(() => {
        bl.dvx(a1, true);
        bl.dvy(a2, true);
    });
    pause(() => {
        cl = geo.create_line_by_cartesian(0, 0, c1, c2);
        cl.opacity(0);
        cl.arrow_e(true);
        cl.opacity(1, true);
    });
}

function complex_multiply() {
    let geo = new Geometry(draw);
    let begin_multi = window.parent.document.getElementById("begin_multi");
    let end_multi = window.parent.document.getElementById("end_multi");
    let target_y = (begin_multi.offsetTop + end_multi.offsetTop) / 2;
    geo.width(L);
    geo.height(L);
    geo.cx(900);
    geo.cy(target_y);
    geo.create_axis();
    let a1 = 1.5, a2 = 2;
    let b1 = 0.5, b2 = 3;
    geo.bound_max_x(3);
    geo.bound_min_x(-3);
    geo.bound_max_y(5);
    geo.bound_min_y(-1);
    let c1 = a1 * b1 - a2 * b2;
    let c2 = a1 * b2 + a2 * b1;
    let al = geo.create_line_by_cartesian(0, 0, a1, a2); al.arrow_e(true);
    let bl = geo.create_line_by_cartesian(0, 0, b1, b2); bl.arrow_e(true);
    let cl;
    pause(() => {
        cl = geo.create_line_by_cartesian(0, 0, c1, c2);
        cl.opacity(0);
        cl.arrow_e(true);
        cl.opacity(1, true);
    });
}

complex_add();
complex_multiply();