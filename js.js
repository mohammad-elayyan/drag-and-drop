let state = true;
const dragItems = document.querySelectorAll(".drag-item");
const dropBoxes = document.querySelectorAll(".drag-box");

dragItems.forEach((item) => {
  item.addEventListener("mouseup", (e) => {
    // state = !state;
  });
  item.addEventListener("touchmove", (e) => {
    // state = !state;
    event.preventDefault();
  });
});
dropBoxes.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    console.log(item.id);
  });
});

interact(".drag-box").dropzone({
  // only accept elements matching this CSS selector
  accept: ".drag-item",
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add("drop-active");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add("drop-target");
    draggableElement.classList.add("can-drop");
    draggableElement.textContent = "Dragged in";
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove("drop-target");
    event.relatedTarget.classList.remove("can-drop");
    event.relatedTarget.textContent = "Dragged out";
    state = true;
  },
  ondrop: function (event) {
    event.relatedTarget.textContent = "Dropped";
    // dragMoveListener(event);
    // state = state ? false : false;
    state = false;
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  },
});

interact(".drag-drop").draggable({
  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent",
      endOnly: true,
    }),
  ],
  autoScroll: true,
  // dragMoveListener from the dragging demo above
  listeners: { move: dragMoveListener, end: dragEndListener },
});

function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
    y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

function dragEndListener(event) {
  console.log(state);
  if (state) {
    var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = 0,
      y = 0;

    // translate the element
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
    // alert("Dropped incorrect");
    state = true;
  } else {
    // alert("Dropped correct");
    state = true;
  }
}

function setStyle(el, background, color) {
  el.style.background = background;
  el.style.color = color;
}
