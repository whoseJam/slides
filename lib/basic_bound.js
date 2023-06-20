
export const BasicBound = (value) => {
    value.show_bound_ = false;
    value.bound_rate_ = 1.2;

    value.show_bound = (flag, animate = false) => {
        if (typeof(flag) === "undefined")
            return value.show_bound_;
        value.opacity_flag_ = true;
        value.show_bound_ = flag;
        value.maintain(animate);
    }

    value.bound_rate = (new_rate, animate = false) => {
        if (typeof(new_rate) === "undefined")
            return value.bound_rate_;
        value.position_flag_ = true;
        value.bound_rate_ = new_rate;
        value.maintain(animate);
    }
} 