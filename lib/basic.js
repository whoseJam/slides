
export const Basic = (value) => {
    value.opacity_ = 1;
    value.opacity_flag_ = false;

    value.opacity = (new_opacity, animate = false) => {
        if (typeof(new_opacity) === "undefined")
            return value.opacity_;
        value.opacity_flag_ = true;
        value.opacity_ = new_opacity;
        value.maintain(animate);
    }
}