import { pause } from "#lib/utility.js";
import { SVG } from "@svgdotjs/svg.js";
import { Geometry } from "#lib/geometry.js";
import { Message } from "#lib/message.js";

let draw = SVG().addTo("body").size(1200, 600);

function complex() {
    let geo = new Geometry(draw);
    geo.cx(600);
    geo.cy(450);
    geo.create_axis(10);
    geo.bound_max_x(10);
    geo.bound_min_x(-10);
    geo.bound_max_y(10);
    geo.bound_min_y(-10);
    
    let l1, l2;
    pause(() => { l1 = geo.create_line_by_cartesian(0, 0, 8, 6); l1.opacity(0); l1.arrow_e(true); l1.opacity(1, true); });
    pause(() => {
        let msg = new Message(draw);
        msg.message("(8,6)");
        msg.x(l1.point_e().x() + 5);
        msg.y(l1.point_e().y());
        msg.opacity(0);
        msg.opacity(1, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("L=10");
        msg.x(l1.cx() - 5);
        msg.y(l1.cy() - 5);
        msg.opacity(0);
        msg.opacity(1, true);
    });
    pause(() => { l2 = geo.create_line_by_cartesian(0, 0, -3, -4); l2.opacity(0); l2.arrow_e(true); l2.opacity(1, true); });
    pause(() => {
        let msg = new Message(draw);
        msg.message("(-3,-4)");
        msg.x(l2.point_e().x() + 5);
        msg.y(l2.point_e().y());
        msg.opacity(0);
        msg.opacity(1, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("L=5");
        msg.x(l2.cx() - 5);
        msg.y(l2.cy() - 5);
        msg.opacity(0);
        msg.opacity(1, true);
    });
}

complex();