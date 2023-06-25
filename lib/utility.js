import { Anitype } from "./i_animation";
import * as d3 from "d3";

let wait_list = [];
let append_list = [];
let _svg = d3.select("body")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 600);

export const Util = {
    create_handle: (iani, ele, animate, name = "_transitioin") => {
        if (iani[name] === undefined)
            iani[name] = null;
        if (animate === Anitype.start)
            iani[name] = ele.transition();
        if (animate === Anitype.append && iani[name] === null)
            iani[name] = ele.transition();
        return animate === Anitype.none ? ele : iani[name]; 
    },

    pause: (fn) => {
        wait_list.push(fn);
        append_list.push(false);
    },

    pause_append: (fn) => {
        wait_list.push(fn);
        append_list.push(true);
    },

    _continue: () => {
        if (wait_list.length === 0) return;
        let fn = wait_list[0];
        let app = append_list[0];
        wait_list = wait_list.slice(1);
        append_list = append_list.slice(1);
        fn();
        while (wait_list.length > 0 && append_list[0]) {
            fn = wait_list[0];
            app = append_list[0];
            wait_list = wait_list.slice(1);
            append_list = append_list.slice(1);
            fn();
        }
    },
    svg: () => {
        return _svg;
    }
};

export const Locator = (locator) => {
    let instance = new Object();
    let begin = window.parent.document.getElementById("begin_" + locator);
    let end = window.parent.document.getElementById("end_" + locator);
    console.log(begin);
    console.log(end);
    instance.cy = () => {
        return (begin.offsetTop + end.offsetTop) / 2;
    };
    instance.min_y = () => {
        return (begin.offsetTop);
    };
    instance.max_y = () => {
        return (end.offsetTop);
    };
    instance.y = () => {
        return instance.min_y();
    };
    instance.my = () => {
        return instance.max_y();
    };
    instance.height = () => {
        return instance.max_y() - instance.min_y();
    }
    return instance;
}

window.continue = Util._continue;