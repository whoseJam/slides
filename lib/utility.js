
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

window.continue = continue_;