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
        if (to === "a") return "S1";
        if (to === "b") return "S2";
        return "S0";
    } else if (stat === "S2") {
        if (to === "a") return "S1"; 
        if (to === "c") return "S3";
        return "S0";
    } else if (stat === "S3") {
        if (to === "a") return "S1";
        return "S0";
    }
}

let str = "abcabcababc";
let s = new Array(svg);
for (let i = 0; i < str.length; i++) {
    s.append(new Text(s._group, String(str[i])));
}
s.cx(300);
s.y(300);

let g = new Graph(svg);
g.cx(800);
g.cy(300);
let stats = ["S0", "S1", "S2"];
let choice = "abc";
g.link({
    source: "S3",
    target: trans("S3", "a"),
    value: new Text(g._group, "a"),
    arrow: true
});
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
    })
    cur = nxt_;
}