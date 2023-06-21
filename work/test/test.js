import { Array } from "#lib/array.js";
import { Grid } from "#lib/grid.js";
import { Message } from "#lib/message.js";
import { Scatter } from "#lib/scatter.js";
import { Stack } from "#lib/stack.js";
import { pause } from "#lib/utility.js";
import { SVG } from "@svgdotjs/svg.js";
import { Geometry } from "#lib/geometry.js";
import { Arrow } from "#lib/arrow.js";
import { Tree } from "#lib/tree.js";

let draw = SVG().addTo("body").size(1200, 600);

function test_array() {
    let x = new Array(draw);
    x.x(20);
    x.y(400);
    pause(() => {
        let msg = new Message(draw);
        msg.message("R");
        x.append(msg, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("R1");
        x.append(msg, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("R23");
        x.append(msg, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("R456");
        x.append(msg, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("R1");
        x.append(msg, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("R23");
        x.append(msg, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("R456");
        x.append(msg, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("R78910");
        x.append(msg);
    });
}

function test_grid() {
    let grid = new Grid(draw);
    grid.n(5);
    grid.m(5);
    pause(() => { grid.green(1, 1, true); })
}

function test_stack() {
    let stack = new Stack(draw);
    stack.x(20);
    stack.y(400);
    stack.element_width(50);
    pause(() => {
        let msg = new Message(draw);
        msg.message("hello");
        stack.push(msg, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("word");
        stack.push(msg, true);
    });
    pause(() => {
        let msg = new Message(draw);
        msg.message("func");
        stack.push(msg, true);
    });
}

function test_geometry() {
    let geo = new Geometry(draw);
    geo.x(400);
    geo.y(400);
    geo.create_axis();
    pause(() => {
        let l = geo.create_line_by_polar(1, 1);
        l.arrow_e(true);
    });
    pause(() => {
        geo.bound_max_x(1, true);
        geo.bound_min_x(-0.2, true);
        geo.bound_max_y(1, true);
        geo.bound_min_y(-0.2, true);
    })
}

function test_message() {
    let msg = new Message(draw);
    msg.message("hello world");
    msg.show_bound(true);
    msg.dx(100, true);
    msg.dy(100, true);
    pause(() => { msg.opacity(0.5, true); });
    pause(() => { msg.show_bound(false, true); });
    pause(() => { msg.show_bound(true, true); });
    pause(() => { msg.opacity(1, true); });
    pause(() => { msg.message("new message without animate"); });
    pause(() => { msg.message("new message with animate", true); });
    pause(() => { msg.bound_rate(2); });
    pause(() => { msg.bound_rate(1.5, true); });

    let show = true;
    let Ax = new Message(draw); Ax.message("系数表示多项式A(x)"); Ax.show_bound(show);
    let Bx = new Message(draw); Bx.message("系数表示多项式B(x)"); Bx.show_bound(false);
    let dAx = new Message(draw); dAx.message("点值表示多项式A(x)"); dAx.show_bound(show);
    let dBx = new Message(draw); dBx.message("点值表示多项式B(x)"); dBx.show_bound(false);
    Ax.x(200); Ax.y(300); dAx.x(Ax.max_x() + 30); dAx.y(300);
    Bx.x(200); Bx.y(340); dBx.x(Bx.max_x() + 30); dBx.y(340);
    console.log(Ax.max_x(), Bx.max_x());

    const ts = (coord) => { return [coord[0] - 5, coord[1]]; }
    let l1 = new Arrow(draw); l1.start(Ax.right()); l1.end(ts(dAx.left())); l1.arrow_e(true);
    let l2 = new Arrow(draw); l2.start(Bx.right()); l2.end(ts(dBx.left())); l2.arrow_e(true);
}

function test_scatter() {
    let scatter = new Scatter(draw);
    scatter.width(600);
    scatter.height(300);
    scatter.cx(600);
    scatter.cy(200);
    scatter.start_group_add();
    for (let i = 0; i <= 10; i++) {
        let msg = new Message(draw);
        msg.message("Hell World");
        scatter.add(msg, true);
    }
    scatter.stop_group_add(true);
}

function test_tree() {
    let tree = new Tree(draw);
    tree.link("1", "2");
    tree.link("1", "3");
    tree.link("3", "4");
    tree.link("3", "5");
    tree.radius(24);
    tree.line_length(60);
    tree.cx(600);
    tree.cy(300);
    tree.root("1");
}

// test_array();
// test_stack();
// test_geometry();
// test_message();
// test_scatter();
test_tree();