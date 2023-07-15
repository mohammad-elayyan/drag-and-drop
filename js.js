// let btn = document.getElementById("btn");
let inp = document.getElementById("inp");
let dragBoxs = document.querySelectorAll(".drag-box");
let drag = null;

(function dragItem() {
  let dragItems = document.querySelectorAll(".drag-item");
  dragItems.forEach((item, indx) => {
    item.addEventListener("dragstart", function () {
      drag = item;
      item.style.opacity = "0.5";
    });
    item.addEventListener("dragend", function () {
      drag = null;
      item.style.opacity = "1";
    });

    dragBoxs.forEach((box, boxindx) => {
      box.addEventListener("dragover", function (e) {
        e.preventDefault();
        setStyle(this, "#090", "#fff");
      });
      box.addEventListener("dragleave", function () {
        setStyle(this, "#fff", "#000");
      });
      box.addEventListener("drop", function () {
        // switch (indx) {
        //   case 0:
        //     boxindx == 2 && this.append(drag);
        //     setStyle(this, "#eaeaea", "#000");
        //   case 1:
        //     boxindx == 1 && this.append(drag);
        //     setStyle(this, "#eaeaea", "#000");
        //     break;
        //   case 2:
        //     boxindx == 3 && this.append(drag);
        //     setStyle(this, "#eaeaea", "#000");
        //     break;
        //   case 3:
        //     boxindx == 0 && this.append(drag);
        //     setStyle(this, "#eaeaea", "#000");
        //     break;
        //   default:
        //     break;
        // }
        this.append(drag);
        setStyle(this, "#fff", "#000");
      });
    });
  });
})();

function setStyle(el, background, color) {
  el.style.background = background;
  el.style.color = color;
}
