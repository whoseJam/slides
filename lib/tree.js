
import { Box } from "#lib/box.js";
import { Edge } from "#lib/edge.js";
import { Basic } from "#lib/basic.js";
import { Vertex } from "#lib/vertex.js";
import { Message } from "#lib/message.js";

// 树节点类
export class Tree {
    constructor(draw) {
        Box(this);
        Basic(this);

        this.show_bounds_ = true;
        this.vertex_map_ = new Map();
        this.edge_list_ = [];
        this.vertex_list_ = [];
        this.radius_ = 15;
        this.line_length_ = 45;
        this.draw_ = draw;
        this.root_name_ = null;
        this.maintain();
    }

    root(new_root_name) {
        if (typeof(new_root_name) === "string") {
            this.root_name_ = new_root_name;
            this.maintain();
        } else return this.vertex_map_[this.root_name_];
    }

    new_node(key, vertex) {
        if (typeof(vertex) != "undefined") {
            this.vertex_map_[key] = vertex;
            this.vertex_list_.push(vertex);
        } else {
            let vertex = new Vertex(this.draw_);
            let msg = new Message(this.draw_);
            msg.message(key);
            vertex.value(msg);
            this.vertex_map_[key] = vertex;
            this.vertex_list_.push(vertex);
        }
    }

    link(vertex_s_name, vertex_e_name, value = null, animate = false) {
        if (!this.vertex_map_.hasOwnProperty(vertex_s_name))
            this.new_node(vertex_s_name);
        if (!this.vertex_map_.hasOwnProperty(vertex_e_name))
            this.new_node(vertex_e_name);
        let s_node = this.vertex_map_[vertex_s_name];
        let e_node = this.vertex_map_[vertex_e_name];
        s_node.link(e_node);
        e_node.link(s_node);
        let new_edge = new Edge(this.draw_);
        new_edge.start(s_node);
        new_edge.end(e_node);
        new_edge.value(value);
        this.edge_list_.push(new_edge);
        this.maintain(animate);
    }

    dx(delta, animate = false) {
        this.x_ += delta;
        this.vertex_list_.forEach((value) => { value.dx(delta, animate); });
        this.edge_list_.forEach((value) => { value.maintain(animate); });
    }

    dy(delta, animate = false) {
        this.y_ += delta;
        this.vertex_list_.forEach((value) => { value.dy(delta, animate); });
        this.edge_list_.forEach((value) => { value.maintain(animate); });
    }

    show_bounds(flag, animate = false) {
        if (typeof(flag) === "undefined")
            return this.show_bounds_;
        this.show_bounds_ = flag;
        this.vertex_list_.forEach((value) => { value.show_boundary(this.show_bounds_, animate); });
    }

    radius(new_radius, animate = false) {
        this.radius_ = new_radius;
        this.maintain(animate);
    }

    line_length(new_line_length, animate = false) {
        this.line_length_ = new_line_length;
        this.maintain(animate);
    }

    edge(vertex_s, vertex_e) {
        if (arguments.length === 2) {
            if (typeof(vertex_s) === "string") vertex_s = this.vertex_map_[vertex_s];
            if (typeof(vertex_e) === "string") vertex_e = this.vertex_map_[vertex_e];
            for (let i = 0; i < this.edge_list_.length; i++) {
                let e = this.edge_list_[i];
                if (e.start() === vertex_s && e.end() === vertex_e) return e;
                if (e.start() === vertex_e && e.end() === vertex_s) return e;
            }
        }
        return null;
    }

    node(vertex_name) {
        return this.vertex_map_[vertex_name];
    }


    blue(vertex_name, animate = false) {
        if (typeof(vertex_name) != "undefined") {
            let vertex = this.vertex_map_[vertex_name];
            vertex.blue(animate);
            return;
        }
        this.vertex_list_.forEach((value) => {
            value.blue(animate);
        });
    }

    grey(vertex_name, animate = false) {
        if (typeof(vertex_name) != "undefined") {
            let vertex = this.vertex_map_[vertex_name];
            vertex.grey(animate);
            return;
        }
        this.vertex_list_.forEach((value) => {
            value.grey(animate);
        });
    }

    green(vertex_name, animate = false) {
        if (typeof(vertex_name) != "undefined") {
            let vertex = this.vertex_map_[vertex_name];
            vertex.green(animate);
            return;
        }
        this.vertex_list_.forEach((value) => {
            value.green(animate);
        });
    }

    default_color(vertex_name, animate = false) {
        if (typeof(vertex_name) != "undefined") {
            let vertex = this.vertex_map_[vertex_name];
            vertex.default_color(animate);
            return;
        }
        this.vertex_list_.forEach((value) => {
            value.default_color(animate);
        });
    }

    maintain(animate = false) {
        if (this.root_name_ === null || 
            !this.vertex_map_.hasOwnProperty(this.root_name_))
            return;
        let root_node = this.vertex_map_[this.root_name_];
        buchheim(root_node, this.line_length_, this.x_, this.y_, animate);
        let min_x = Number.MAX_VALUE, min_y = Number.MAX_VALUE;
        let max_x = Number.MIN_VALUE, max_y = Number.MIN_VALUE;
        this.vertex_list_.forEach((value) => {
            if (value.tree_mark_) {
                value.radius(this.radius_, animate);
                value.opacity(this.opacity_);
                value.show_bound(this.show_bounds_, animate);
            } else {
                value.radius(this.radius_);
                value.opacity(this.opacity_);
                value.show_bound(this.show_bounds_);
                value.tree_mark_ = true;
            }
            min_x = Math.min(min_x, value.min_x());
            min_y = Math.min(min_y, value.min_y());
            max_x = Math.max(max_x, value.max_x());
            max_y = Math.max(max_y, value.max_y());
        });
        this.width_ = max_x - min_x;
        this.height_ = max_y - min_y;
        this.edge_list_.forEach((value) => {
            value.position_flag_ = true;
            value.opacity(this.opacity_);
            if (value.tree_mark_) {
                value.maintain(animate);
            } else {
                value.maintain();
                value.tree_mark_ = true;
            }
        });
    }
}

// 绘制树类
class DrawTree {
    constructor(node, parent = null, depth = 0, number = 1) {
        this.hold = node;
        this.x_ = -1;
        this.y_ = depth;
        this.children = [];
        let len = node.to_.length;

        for (let i = 0; i < len; i++) {
            let child = node.to_[i];
            if (parent != null && child === parent.hold) continue;
            this.children.push(new DrawTree(child, this, depth + 1, i + 1));
        }
        this.parent = parent;
        // 线程节点，也就是指向下一个轮廓节点
        this.thread = null;
        // 根据左兄弟定位的x与根据子节点中间定位的x之差
        this.mod = 0;
        // 要么指向自身，要么指向所属树的根
        this.ancestor = this;
        this.change = this.shift = 0;
        // 最左侧的兄弟节点
        this._lmost_sibling = null;
        // 这是它在兄弟节点中的位置索引 1...n
        this.number = number;
    }

    // 有线程返回线程节点，否则返回最右侧的子节点，也就是树的右轮廓
    right() {
        return (
            this.thread ||
            (this.children.length > 0
            ? this.children[this.children.length - 1]
            : null)
        );
    }

    // 有线程返回线程节点，否则返回最左侧的子节点，也就是树的左轮廓
    left() {
        return (
            this.thread || (this.children.length > 0 ? this.children[0] : null)
        );
    }

    // 获取前一个兄弟节点
    left_brother() {
        let n = null;
        if (this.parent) {
            for (let i = 0; i < this.parent.children.length; i++) {
                let node = this.parent.children[i];
                if (node === this) {
                    return n;
                } else {
                    n = node;
                }
            }
        }
        return n;
    }

    // 获取同一层级第一个兄弟节点，如果第一个是自身，那么返回null
    get_lmost_sibling() {
        if (
            !this._lmost_sibling &&
            this.parent &&
            this !== this.parent.children[0]
        ) {
            this._lmost_sibling = this.parent.children[0];
        }
        return this._lmost_sibling;
    }

    // 同一层级第一个兄弟节点
    get leftmost_sibling() {
        return this.get_lmost_sibling();
    }
}

  // 第一次递归
const firstwalk = (v, distance = 1) => {
    if (v.children.length === 0) {
        // 当前节点是叶子节点且存在左兄弟节点，则其x坐标等于其左兄弟的x坐标加上间距distance
        if (v.leftmost_sibling) {
            v.x = v.left_brother().x + distance;
        } else {
            // 当前节点是叶节点无左兄弟，那么x坐标为0
            v.x = 0;
        }
    } else {
        // default_ancestor默认为第一个子节点
        let default_ancestor = v.children[0];
        v.children.forEach((child) => {
            firstwalk(child);
            default_ancestor = apportion(child, default_ancestor, distance);
        });
        execute_shifts(v);
        // 子节点的中点
        let midpoint =
            (v.children[0].x + v.children[v.children.length - 1].x) / 2;
        let w = v.left_brother();
        if (w) {
            // 如果是非叶子节点则其x坐标等于其左兄弟的x坐标加上间距distance
            v.x = w.x + distance;
            // 同时记录下偏移量（x坐标与子节点的中点之差）
            v.mod = v.x - midpoint;
        } else {
            // 没有左兄弟节点，x坐标直接是子节点的中点
            v.x = midpoint;
        }
    }
    return v;
};

  // 修正子孙节点定位
const apportion = (v, default_ancestor, distance) => {
    let leftBrother = v.left_brother();
    if (leftBrother) {
      // 四个节点指针
        let vInnerRight = v;// 右子树左轮廓
        let vOuterRight = v;// 右子树右轮廓
        let vInnerLeft = leftBrother;// 当前节点的左兄弟节点，左子树右轮廓
        let vOuterLeft = v.leftmost_sibling;// 当前节点的最左侧的兄弟节点，左子树左轮廓

        // 四个累加mod值的变量
        let sInnerRight = v.mod;
        let sOuterRight = v.mod;
        let sInnerLeft = vInnerLeft.mod;
        let sOuterLeft = vOuterLeft.mod;

        while (vInnerLeft.right() && vInnerRight.left()) {
            vInnerLeft = vInnerLeft.right();
            vInnerRight = vInnerRight.left();
            vOuterLeft = vOuterLeft.left();
            vOuterRight = vOuterRight.right();

            vOuterRight.ancestor = v;

            let shift = vInnerLeft.x + sInnerLeft - (vInnerRight.x + sInnerRight) + distance;
            if (shift > 0) {
                let _ancestor = ancestor(vInnerLeft, v, default_ancestor);
                move_subtree(_ancestor, v, shift);
                sInnerRight = sInnerRight + shift;
                sOuterRight = sOuterRight + shift;
            }

            sInnerLeft += vInnerLeft.mod;
            sInnerRight += vInnerRight.mod;
            sOuterLeft += vOuterLeft.mod;
            sOuterRight += vOuterRight.mod;
        }

        // 将线程从浅的树的外侧设置到深的树的内侧
        if (vInnerLeft.right() && !vOuterRight.right()) {
            vOuterRight.thread = vInnerLeft.right();
            vOuterRight.mod += sInnerLeft - sOuterRight;
        } else {
            if (vInnerRight.left() && !vOuterLeft.left()) {
                vOuterLeft.thread = vInnerRight.left();
                vOuterLeft.mod += sInnerRight - sOuterLeft;
            }
            default_ancestor = v;
        }
    }
    return default_ancestor;
};

const move_subtree = (wl, wr, shift) => {
    // 两棵冲突的树的间隔被之间的树分成多少分
    let subtrees = wr.number - wl.number;
    wr.change -= shift / subtrees;
    wr.shift += shift;
    wl.change += shift / subtrees;
    // 自身移动
    wr.x += shift;
    // 后代节点移动
    wr.mod += shift;
};

const execute_shifts = (v) => {
    let shift = 0;
    let change = 0;
    for (let i = v.children.length - 1; i >= 0; i--) {
        let w = v.children[i];
        w.x += shift;
        w.mod += shift;
        change += w.change;
        shift += w.shift + change;
    }
};

  // 如果vil节点的祖先节点在v节点的兄弟节点中，那么返回vil的祖先节点，否则返回default_ancestor
const ancestor = (vInnerLeft, v, default_ancestor) => {
    if (v.parent.children.includes(vInnerLeft.ancestor)) {
        return vInnerLeft.ancestor;
    } else {
        return default_ancestor;
    }
};

// 第二次遍历
const second_walk = (v, m = 0, depth = 0, min = null) => {
    // 初始x值加上所有祖宗节点的mod修正值
    v.x += m;
    v.y = depth;
    if (min === null || v.x < min) {
        min = v.x;
    }
    v.children.forEach((child) => {
        min = second_walk(child, m + v.mod, depth + 1, min);
    });
    return min;
};

const third_walk = (tree, n) => {
    tree.x += n;
    tree.children.forEach((child) => {
        third_walk(child, n);
    });
};

const fourth_walk = (tree, line_length, offsetx, offsety, animate) => {
    console.log("tree walk", offsetx + tree.x * line_length, offsety + tree.y * line_length)
    if (tree.hold.tree_mark_) {
        tree.hold.x(offsetx + tree.x * line_length, animate);
        tree.hold.y(offsety + tree.y * line_length, animate);
    } else {
        tree.hold.opacity(0);
        tree.hold.x(offsetx + tree.x * line_length);
        tree.hold.y(offsety + tree.y * line_length);
        tree.hold.opacity(1, animate);
    }
    tree.children.forEach((child) => {
        fourth_walk(child, line_length, offsetx, offsety, animate);
    })
}

const buchheim = (tree, line_length, offsetx, offsety, animate) => {
    let dt = firstwalk(new DrawTree(tree));
    let min = second_walk(dt);
    if (min < 0) third_walk(dt, -min);
    fourth_walk(dt, line_length, offsetx, offsety, animate);
    return dt;
};