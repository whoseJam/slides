import { Tree } from "#lib/tree";
import { Text } from "#lib/text";
import { Util } from "#lib/utility";
import { Anitype } from "#lib/i_animation";
import { Color } from "#lib/color";

let svg = Util.svg();
let pause = Util.pause;
 
let data = [
    {"id": "Eve",   "parent": "" },
    {"id": "Cain",  "parent": "Eve"},
    {"id": "Seth",  "parent": "Eve"},
    {"id": "Enos",  "parent": "Seth"},
    {"id": "Noam",  "parent": "Seth"},
    {"id": "Abel",  "parent": "Eve"},
    {"id": "Awan",  "parent": "Eve"},
    {"id": "Enoch", "parent": "Awan"},
    {"id": "Azura", "parent": "Eve"},
];

let tr = new Tree(svg);
data.forEach((item) => {
    item.value = new Text(tr._group, item.id);
});
tr.data(data);

pause(() => {
    tr.append_data(
        {"id": "T0", "parent": "Awan", "value": new Text(tr._group, "T0")},
        Anitype.start);
    tr.append_data(
        {"id": "T1", "parent": "Azura", "value": new Text(tr._group, "T1")},
        Anitype.append);
    tr.color_all(Color.blue_pack, Anitype.start);
    tr.update_content_size(Anitype.start);
});
pause(() => {
    tr.append_data(
        {"id": "T2", "parent": "Azura", "value": new Text(svg, "T1") },
        Anitype.start);
});
pause(() => {
    tr.color_all(Color.blue_pack, Anitype.start);
})