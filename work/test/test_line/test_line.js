import { Line } from "#lib/line";
import { Util } from "#lib/utility";
import { Anitype } from "#lib/i_animation";
import { Color } from "../../../lib/color";

let svg = Util.svg();
let pause = Util.pause;

let l = new Line(svg);
l.x1(0); l.y1(0);
l.x2(0); l.y2(40);
pause(() => {
    l.x(100, Anitype.start);
    l.y(100, Anitype.append);
})

pause(() => {
    l.stroke(Color.green, Anitype.append);
    l.opacity(0, Anitype.start);
    l.opacity(1, Anitype.start);
    l.x(200, Anitype.start);
    l.y(200, Anitype.start);
    l.x(100, Anitype.start);
    l.y(100, Anitype.start);
});
