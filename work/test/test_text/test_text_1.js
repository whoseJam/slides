import { Text, Circle, Util, Anitype, Color } from "#lib/slide";

let pause = Util.pause;
let svg = Util.svg();
let txt = new Text(svg, "Hello World, I Will Delete Myself");
pause(() => {
    txt.delete();
});
