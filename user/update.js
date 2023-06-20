const update = () => {
  let slide = document.querySelector("div.slides");
  let present = document.querySelector(".present");
  let presents = [];
  while (true) {
    let finish = true;
    presents.push(present);
    for (let i = 0; i < present.children.length; i++) {
      if (present.children[i].classList.contains('present')) {
        present = present.children[i]; finish = false; break;
      }
    }
    if (finish) break;
  }
  let contain_h1 = false;
  let layout_hint = "middle";
  for (let i = 0; i < present.children.length; i++) {
    let child = present.children[i];
    if (child.tagName === "H1") contain_h1 = true;
    if (child.tagName === "P") {
        if (child.className === "left") layout_hint = "left";
        if (child.className === "right") layout_hint = "right";
        if (child.className === "author") child.style = "text-align: center";
    }
  }
  if (contain_h1) {
    slide.style = "width: 1160px; height: 700px; margin-left: 40px;";
  }
  else {
    present.style = "text-align: left; display: block; top: 30px;";
    if (layout_hint === "left") slide.style = "width: 600px; height: 700px; margin-left: 40px;";
    else if (layout_hint === "middle") slide.style = "width: 1160px; height: 700px; margin-left: 40px;";
    else slide.style = "width: 600px; height: 700px; margin-left: 640px;";
  }
  setTimeout(update, 20);
}
setTimeout(update, 20);