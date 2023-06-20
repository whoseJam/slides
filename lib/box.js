
export const Box = (value) => {
    value.x_ = 0;
    value.y_ = 0;
    value.width_ = 0;
    value.height_ = 0;
    value.position_flag_ = false;

    value.move = (delta_x, delta_y, animate = false) => {
        value.dx(delta_x, animate);
        value.dy(delta_y, animate);
    }

    value.dx = (delta, animate = false) => {
        value.x_ += delta;
        value.position_flag_ = true;
        value.maintain(animate);
    }

    value.dy = (delta, animate = false) => {
        value.y_ += delta;
        value.position_flag_ = true;
        value.maintain(animate);
    }

    value.x = (new_x, animate = false) => {
        if (typeof(new_x) === "undefined")
            return value.x_;
        value.position_flag_ = true;
        value.dx(new_x - value.x_, animate);
    }

    value.y = (new_y, animate = false) => {
        if (typeof(new_y) === "undefined")
            return value.y_;
        value.position_flag_ = true;
        value.dy(new_y - value.y_, animate);
    }

    value.test_box = () => {
        let ans = Box(new Object());
        ans.x_ = value.x_;
        ans.y_ = value.y_;
        ans.width_ = value.width_;
        ans.height_ = value.height_;
        return ans;
    }

    value.test_contract = () => {
        let width = value.width_;
        let height = value.height_;
        ans.width_ -= (width / (width + height));
        ans.height_ -= (height / (width + height));
    }

    value.test_expand = () => {
        let width = value.width_;
        let height = value.height_;
        ans.width_ += (width / (width + height));
        ans.height_ += (height / (width + height));
    }

    value.test_dx = (delta) => {
        value.x_ += delta;
    }

    value.test_dy = (delta) => {
        value.y_ += delta;
    }

    value.min_x = () => {
        return value.x_;
    }

    value.max_x = () => {
        return value.x_ + value.width_;
    }

    value.min_y = () => {
        return value.y_;
    }

    value.max_y = () => {
        return value.y_ + value.height_;
    }

    value.top_left = () => {
        return [value.min_x(), value.min_y()];
    }

    value.top = () => {
        return [value.cx(), value.min_y()];
    }

    value.top_right = () => {
        return [value.max_x(), value.min_y()];
    }

    value.left = () => {
        return [value.min_x(), value.cy()];
    }

    value.center = () => {
        return [value.cx(), value.cy()];
    }
    
    value.right = () => {
        return [value.max_x(), value.cy()];
    }

    value.bottom_left = () => {
        return [value.min_x(), value.max_y()];
    }

    value.bottom = () => {
        return [value.cx(), value.max_y()];
    }

    value.bottom = () => {
        return [value.max_x(), value.max_y()];
    }

    value.cx = (new_cx, animate = false) => {
        if (typeof(new_cx) === "undefined")
            return value.x_ + value.width_ / 2;
        value.position_flag_ = true;
        value.dx(new_cx - value.cx(), animate);
    }

    value.cy = (new_cy, animate = false) => {
        if (typeof(new_cy) === "undefined")
            return value.y_ + value.height_ / 2;
        value.position_flag_ = true;
        value.dy(new_cy - value.cy(), animate);
    }

    value.mx = (new_mx, animate = false) => {
        if (typeof(new_mx) === "undefined")
            return value.x_ + value.width_;
        value.position_flag_ = true;
        value.dx(new_mx - value.mx(), animate);
    }

    value.my = (new_my, animate = false) => {
        if (typeof(new_my) === "undefined")
            return value.y_ + value.height_;
        value.position_flag_ = true;
        value.dy(new_my - value.my(), animate);
    }
}