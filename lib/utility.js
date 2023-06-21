
let wait_list = [];
let append_list = [];

export const create_handle = (ele, animate) => {
    return animate ? ele.animate({ when: "now" }) : ele;
}

export const pause = (fn) => {
    wait_list.push(fn);
    append_list.push(false);
}

export const pause_append = (fn) => {
    wait_list.push(fn);
    append_list.push(true);
}

export const continue_ = () => {
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
}

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

window.continue = continue_;