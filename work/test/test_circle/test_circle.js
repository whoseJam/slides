import { Circle } from "#lib/circle";
import { Util } from "#lib/utility";
import { Anitype } from "#lib/i_animation";
import { Color } from "../../../lib/color";

let svg = Util.svg();
let pause = Util.pause;
let s = 1;
let cir = new Circle(svg);
cir.x(100);
cir.y(100);
pause(() => {
    cir.fill(Color.green, Anitype.start);
    cir.opacity(0.5, Anitype.start);
    cir.opacity(1, Anitype.start);
    cir.x(200, Anitype.start);
    cir.y(200, Anitype.start);
    cir.x(100, Anitype.start);
    cir.y(100, Anitype.start);
});

pause(() => {
    cir.width(60);
    cir.height(60);
})
