import { Array, Util, Text, Anitype } from "#lib/slide";

let pause = Util.pause;
let pause_append = Util.pause_append;
let svg = Util.svg();

const count_1 = (x) => {
    let ans = 0;
    while(x !== 0) {
        let last = x % 10;
        if (last == 1) ans++;
        x = Math.floor(x / 10);
    }
    return ans;
}

let ori = new Array(svg);
let arr = new Array(svg);
let sum = new Array(svg);
ori.x(10); ori.y(240);
arr.x(10); arr.y(280);
sum.x(10); sum.y(320);
let n = 20;

for (let i = 1; i <= n; i++) {
    ori.append(new Text(svg, String(i)));
}

let s = 0;
for (let i = 1; i <= n; i++) {
    let a = count_1(i);
    console.log(s, a);
    s = (s + a);
    let v = s;
    pause(() => {
        arr.append(new Text(svg, String(a)), Anitype.start);
        sum.append(new Text(svg, String(v)), Anitype.start);
    })
}