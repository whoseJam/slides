import { Anitype } from "./i_animation";

export const IBox = (value) => {
    value.cx = (new_cx, animate = Anitype.none) => {
        if (typeof(new_cx) === "undefined")
            return value.x() + value.width() / 2;
        value.x(value.x() + new_cx - value.cx(), animate);
    };

    value.cy = (new_cy, animate = Anitype.none) => {
        if (typeof(new_cy) === "undefined")
            return value.y() + value.height() / 2;
        value.y(value.y() + new_cy - value.cy(), animate);
    };

    value.dx = (delta, animate = Anitype.none) => {
        value.x(value.x() + delta, animate);
    };

    value.dy = (delta, animate = Anitype.none) => {
        console.log(value.y(), delta, value.y() + delta);
        value.y(value.y() + delta, animate);
    };

    value.mx = (new_mx, animate = Anitype.none) => {
        if (typeof(new_mx) === "undefined")
            return value.x() + value.width();
        value.x(value.x() + new_mx - value.mx(), animate);
    };

    value.my = (new_my, animate = Anitype.none) => {
        if (typeof(new_my) === "undefined")
            return value.y() + value.height();
        value.y(value.y() + new_my - value.my(), animate);
    };

    return value;
}