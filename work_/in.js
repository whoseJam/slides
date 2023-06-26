import { Util } from "#lib/utility";
import { Stack } from "#lib/stack";
import { Text } from "#lib/text";
import { Anitype } from "#lib/i_animation"
import * as d3 from "d3";

let svg = Util.svg();
let pause = Util.pause;
let A = Anitype.append;
let S = Anitype.start;
let txt = (str) => {
    return (svg) => { return new Text(svg, str); }
}

let process_stack = new Stack(svg);
process_stack.width(100);
process_stack.expand_direction(1);
process_stack.fix_height(false);

pause(() => {
    process_stack.push(txt("Hello"), Anitype.start);
});
pause(() => {
    process_stack.push(txt("World"), Anitype.start);
});
pause(() => {
    process_stack.pop(Anitype.start);
})