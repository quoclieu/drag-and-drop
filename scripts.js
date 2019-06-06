const body = document.body;
const rectangle = document.createElement('div');
rectangle.style.width = '50px';
rectangle.style.height = '50px';
rectangle.style.backgroundColor = 'red';
body.appendChild(rectangle);

rectangle.addEventListener('click', e => {});

// Move on click, snap object
const translateObject = (e, element, width, height, body, offsetX, offsetY) => {
  let x = e.pageX - offsetX;
  let y = e.pageY - offsetY;
  if (x + width > body.clientWidth) {
    x = body.clientWidth - width;
  }
  if (y + width > body.clientHeight) {
    y = body.clientHeight - height;
  }
  element.style.transform = `translate(${x}px, ${y}px)`;
};

// on mouse over -> ready to drag -> click - dragging -> on mouse move - translating -> on mouse up - stop dragging
let offsetX = 0;
let offsetY = 0;
let drag = false;
rectangle.addEventListener('mousedown', e => {
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  drag = true;
});

body.addEventListener('mousemove', e => {
  if (drag) {
    translateObject(e, rectangle, 50, 50, body, offsetX, offsetY);
  }
});

rectangle.addEventListener('mouseup', () => {
  drag = false;
});

body.addEventListener('mouseleave', () => {
  drag = false;
});
