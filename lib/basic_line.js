
export const BasicLine = (value, draw) => {
    value.arrow_s_ = false;
    value.arrow_e_ = false;
    value.arrow_marker_ = draw.marker(10, 10, (add) => { add.path("M 2 2 L 2 11 L 10 6 L 2 2"); });
    value.empty_marker_ = draw.marker(10, 10, (add) => {});
    value.arrow_flag_ = false;

    value.arrow_s = (flag, animate = false) => {
        if (typeof(flag) === "undefined")
            return value.arrow_s_;
        value.arrow_flag_ = true;
        value.arrow_s_ = flag;
        value.maintain(animate);
    }

    value.arrow_e = (flag, animate = false) => {
        if (typeof(flag) === "undefined")
            return value.arrow_e_;
        value.arrow_flag_ = true;
        value.arrow_e_ = flag;
        value.maintain(animate);
    }
    return value;
}