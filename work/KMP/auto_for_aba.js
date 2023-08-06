import { Util, Anitype, Text, Array, Graph, Color } from "#lib/slide";

let svg = Util.svg();
let pause = Util.pause;
let pause_append = Util.pause_append;
let S = Anitype.start;
let A = Anitype.append;

function trans(stat, to) {
    if (stat === "S0") {
        if (to === "a") return "S1";
        return "S0";
    } else if (stat === "S1") {
        if (to === "b") return "S2";
        return "S1";
    } else if (stat === "S2") {
        if (to === "a") return "S3";
        return "S0";
    } else if (stat === "S3") {
        if (to === "b") return "S2";
        return "S1";
    }
}

let str = "abaabaababa";
let pat = "aba";
let p = new Array(svg);
for (let i = 0; i < pat.length; i++) {
    p.append(new Text(p._group, String(pat[i])));
}
let s = new Array(svg);
for (let i = 0; i < str.length; i++) {
    s.append(new Text(s._group, String(str[i])));
}
s.cx(300);
s.y(300);
p.x(s.x());
p.y(340);

let g = new Graph(svg);
g.cx(800);
g.cy(300);
let stats = ["S0", "S1", "S2", "S3"];
let choice = "ab";
stats.forEach((stat) => {
    for (let i = 0; i < choice.length; i++) {
        let to = trans(stat, choice[i]);
        if (stat !== to) g.link({
            source: stat,
            target: to,
            value: new Text(g._group, String(choice[i])),
            arrow: true
        })
    }
})

let cur = "S0";
g.color(cur, Color.green_pack, S);
for (let i = 0; i < str.length; i++) {
    let cur_ = cur;
    let nxt_ = trans(cur_, str[i]);
    pause(() => {
        if (i > 0) s.color(i - 1, Color.default_pack, S);
        s.color(i, Color.red_pack, S);
    })
    pause(() => {
        g.color(cur_, Color.default_pack, S);
        g.color(nxt_, Color.green_pack, S);
        let length = Number(nxt_[1]);
        for (let i = 0; i < length; i++)
            p.color(i, Color.green_pack, S);
        for (let i = length; i < pat.length; i++)
            p.color(i, Color.default_pack, S);
    })
    cur = nxt_;
}