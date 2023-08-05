import { Text, Circle, Util, Anitype, Color } from "#lib/slide";

let svg = Util.svg();
let pause = Util.pause;

let txt = new Text(svg);
txt.text("Hello World");
txt.x(100);
txt.y(100);
pause(() => {
    txt.text("Are You OK?", Anitype.start);
    txt.fill(Color.green, Anitype.append);
    txt.opacity(0, Anitype.start);
    txt.opacity(1, Anitype.start);
    txt.x(200, Anitype.start);
    txt.y(200, Anitype.start);
    txt.x(100, Anitype.start);
    txt.y(100, Anitype.start);
});

pause(() => {
    let cir = new Circle(svg);
    cir.fill_opacity(0);
    cir.cx(100);
    cir.cy(100);
    txt.cx(100);
    txt.cy(100);
});

pause(() => {
    txt.width(30, Anitype.start);
    txt.cx(100, Anitype.append);
    txt.cy(100, Anitype.append);
});

pause(() => {
    console.log(txt.cx());
    console.log(txt.cy());
})
