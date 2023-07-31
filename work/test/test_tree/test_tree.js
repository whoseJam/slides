import { Tree } from "#lib/tree";
import { Text } from "#lib/text";
import { Util } from "#lib/utility";
import { Anitype } from "#lib/i_animation";
import { Color } from "#lib/color";

let svg = Util.svg();
let pause = Util.pause;
 
let data = [
    {"name": "Eve",   "parent": "" },
    {"name": "Cain",  "parent": "Eve"},
    {"name": "Seth",  "parent": "Eve"},
    {"name": "Enos",  "parent": "Seth"},
    {"name": "Noam",  "parent": "Seth"},
    {"name": "Abel",  "parent": "Eve"},
    {"name": "Awan",  "parent": "Eve"},
    {"name": "Enoch", "parent": "Awan"},
    {"name": "Azura", "parent": "Eve"},
];

data.forEach((item) => {
    item.value = () => {
        let tmp = new Text(svg, item.name);
        return tmp;
    };
});

let tr = new Tree(svg);
tr.plain_data(data, "name", "parent");

pause(() => {
    tr.append_plain_data(
        {"name": "HSJ", "parent": "Awan", "value": () => { return new Text(svg, "HSJ"); }},
        Anitype.start);
    tr.append_plain_data(
        {"name": "SSS", "parent": "Azura", "value": () => { return new Text(svg, "FFF"); }},
        Anitype.append);
    tr.color_all(Color.blue_pack, Anitype.start);
    tr.update_content_size(Anitype.start);
});
pause(() => {
    tr.append_plain_data(
        {"name": "RRR", "parent": "Azura", "value": () => { return new Text(svg, "HSJ"); }},
        Anitype.start);
});
pause(() => {
    tr.color_all(Color.blue_pack, Anitype.start);
})