import { Scatter } from "#lib/scatter";
import { Util } from "#lib/utility";
import { Anitype } from "#lib/i_animation";
import { Rect } from "#lib/rect";
import { Text } from "#lib/text";
import { Color } from "../../../lib/color";

let svg = Util.svg();
let pause = Util.pause;

let bound = new Rect(svg);
let s = new Scatter(svg);
s.x(100);
s.y(400);
s.width(300);
s.height(100);
bound.fill_opacity(0);
bound.stroke(Color.black);
bound.stroke_opacity(1);
bound.x(100);
bound.y(400);
bound.width(300);
bound.height(100);

pause(() => { s.add(new Text(svg, "BAD APPLE"), Anitype.start); });
pause(() => {
    s.width(500, Anitype.start);
    bound.width(500, Anitype.start);
})
pause(() => { s.add(new Text(svg, "H1"), Anitype.start); });
pause(() => { s.add(new Text(svg, "BILI"), Anitype.start); });
pause(() => { s.add(new Text(svg, "F.K"), Anitype.start); });
pause(() => { s.add(new Text(svg, "BAD APPLE"), Anitype.start); });
pause(() => { s.add(new Text(svg, "H1"), Anitype.start); });
pause(() => { s.add(new Text(svg, "BILI"), Anitype.start); });
pause(() => { s.add(new Text(svg, "F.K"), Anitype.start); });
pause(() => {
    s.width(300, Anitype.start);
    bound.width(300, Anitype.start);
})