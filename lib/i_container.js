import { Anitype } from "./i_animation";

export const IContainer = (value) => {
    value._layout = "center";

    value._update_layout = (ele, animate = Anitype.none) => {
        // console.log(ele, value._layout, animate);
        if (value._layout === "top_left") {
            ele.x(value.x(), animate);
            ele.y(value.y(), animate);
        } else if (value._layout === "top") {
            ele.cx(value.cx(), animate);
            ele.y(value.y(), animate);
        } else if (value._layout === "top_right") {
            ele.mx(value.mx(), animate);
            ele.y(value.y(), animate);
        } else if (value._layout === "left") {
            ele.x(value.x(), animate);
            ele.cy(value.cy() + 3, animate);
        } else if (value._layout === "center") {
            ele.cx(value.cx(), animate);
            ele.cy(value.cy() + 3, animate);
        } else if (value._layout === "right") {
            ele.mx(value.mx(), animate);
            ele.cy(value.cy() + 3, animate);
        } else if (value._layout === "bottom_left") {
            ele.x(value.x(), animate);
            ele.my(value.my(), animate);
        } else if (value._layout === "bottom") {
            ele.cx(value.cx(), animate);
            ele.my(value.my(), animate);
        } else if (value._layout === "bottom_right") {
            ele.mx(value.mx(), animate);
            ele.my(value.my(), animate);
        }
    }

    return value;
}