import { Util, Anitype, Text, Array, Graph, Color } from "#lib/slide";

let svg = Util.svg();
let pause = Util.pause;
let pause_append = Util.pause_append;
let S = Anitype.start;
let A = Anitype.append;

const create_1d = (len) => {
    let ans = [];
    for (let i = 0; i < len; i++)
        ans.push(0);
    return ans;
}

let q = create_1d(100);
let q_ = new Array(svg);
let h = 0, t = 0;
let arr = [1, 3, -1, -3, 5, 3, 6, 7];
let arr_ = new Array(svg);
arr.forEach((v) => {
    arr_.append(new Text(arr_._group, String(v))); })
let k = 3;

q_.x(10); q_.y(300); q_.element_width(40); q_.element_height(40);
arr_.x(10); arr_.y(350); arr_.element_width(40); arr_.element_height(40); 

for (let i = 0; i < arr.length; i++) {
    pause(() => {
        console.log(i, i-k, i-1, );
        if (i - k >= 0) arr_.color(i - k, Color.default_pack, S);
        for (let j = i - 1; j > i - k; j--) {
            if (j >= 0) arr_.color(j, Color.green_pack, S);
        } arr_.color(i, Color.red_pack, S);
    })
    if (q[h] === i - k) {
        h++;
        pause(() => { q_.remove(0, S); })
    }

    let v = arr[i];
    pause(() => {
        q_.append(new Text(q_._group, String(v)));
    })

    while (h < t && arr[i] > arr[q[t - 1]]) {
        t--;
        let pos = t - h;
        pause(() => { 
            q_.remove(pos, S);
        })
    }
    q[t++] = i;
}