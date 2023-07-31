
export const Anitype = {
    append: 1,
    start: 2,
    none: 3
};

export const TICK = 1000;

export const IAnimation = (value) => {

    value._animation_check = (name, prop) => {
        let channel_name = value._animation_channel(name);
        let channel_queue = value._animation_channel_queue(name);
        for (let i = value[channel_queue].length - 1; i >= 0; i--) {
            if (value[channel_queue][i].hasOwnProperty(prop))
                return value[channel_queue][i][prop];
        }
        if (value[channel_name] !== null && value[channel_name].hasOwnProperty(prop))
            return value[channel_name][prop];
        return null;
    }

    value._animation_channel = (name) => {
        return "animation_channel_" + name;
    }

    value._animation_channel_queue = (name) => {
        return "animation_channel_queue_" + name;
    }

    value._register_animation_channel = (name) => {
        value[value._animation_channel(name)] = null;
        value[value._animation_channel_queue(name)] = [];
    }

    value._animation_size = (name) => {
        let channel_name = value._animation_channel(name);
        let channel_queue = value._animation_channel_queue(name);
        if (value[channel_name] === null)
            return 0;
        console.log(value[channel_name], value[channel_queue], channel_name, channel_queue);
        return 1 + value[channel_queue].length;
    }

    value._append_animation = (name) => {
        let channel_name = value._animation_channel(name);
        let channel_queue = value._animation_channel_queue(name);
        if (value[channel_name] === null) {
            value[channel_name] = value[name]
                .transition()
                .delay(TICK * value._animation_size(name))
                .on("end", () => {
                value[channel_name] = null;
                if (value[channel_queue].length > 0) {
                    let first = value[channel_queue][0];
                    value[channel_name] = first;
                    value[channel_queue] = value[channel_queue].slice(1);
                }
            });
            return value[channel_name];
        } else if (value[channel_queue].length === 0) {
            return value[channel_name];
        } else if (value[channel_queue].length > 0) {
            return value[channel_queue].slice(-1)[0];
        }
    }

    value._start_animation = (name) => {
        let channel_name = value._animation_channel(name);
        let channel_queue = value._animation_channel_queue(name);
        const start_frame_finish = () => {
            value[channel_name] = null;
            if (value[channel_queue].length > 0) {
                let first = value[channel_queue][0];
                value[channel_name] = first;
                value[channel_queue] = value[channel_queue].slice(1);
            }
        }
        console.log(name, value[name]);
        if (value[channel_name] === null) {
            value[channel_name] = value[name]
                .transition()
                .delay(TICK * value._animation_size(name))
                .on("end", start_frame_finish);
            return value[channel_name];
        } else {
            let trans = value[name]
                .transition()
                .delay(TICK * value._animation_size(name))
                .on("end", start_frame_finish);
            value[channel_queue].push(trans);
            return trans;
        }
    }

    value._animation = (name) => {
        let animate = value._animation_status();
        if (animate === Anitype.append)
            return value._append_animation(name);
        if (animate === Anitype.start)
            return value._start_animation(name);
        return value[name];
    }

    value._animation_status = (animate) => {
        if (typeof(animate) !== "undefined") {
            value._animate_status = animate;
            let object = new Object();
            object._animate_status = animate;
            object.fir_status = () => {
                return object._animate_status;
            }
            object.sec_status = () => {
                return (object._animate_status === Anitype.start) ? Anitype.append : object._animate_status;
            }
            return object;
        }
        if (value._animate_status === Anitype.start) {
            value._animate_status = Anitype.append;
            return Anitype.start;
        }
        return value._animate_status;
    }

    return value;
}