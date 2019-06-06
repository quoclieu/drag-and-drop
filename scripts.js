const body = document.body;
const circle = document.createElement('div');
circle.style.width = '80px';
circle.style.height = '80px';
circle.style.borderRadius = '50%';
circle.style.backgroundColor = 'blue';
body.appendChild(circle);
const rectangle = document.createElement('div');
rectangle.style.width = '50px';
rectangle.style.height = '50px';
rectangle.style.backgroundColor = 'red';
body.appendChild(rectangle);

const abs = num => {
  if (num < -1) {
    return num * -1;
  }
  return num;
};

const dragAndDrop = (element, height, width) => {
  const translateObject = (
    e,
    element,
    width,
    height,
    body,
    offsetX,
    offsetY
  ) => {
    let x = e.pageX - offsetX - abs(element.offsetLeft);
    let y = e.pageY - offsetY - abs(element.offsetTop);
    if (x < -abs(element.offsetLeft)) {
      x = -abs(element.offsetLeft);
    }
    if (x + width > body.clientWidth) {
      x = body.clientWidth - width;
    }
    if (y + height > body.clientHeight - abs(element.offsetTop)) {
      y = body.clientHeight - height - abs(element.offsetTop);
    }
    if (y < -abs(element.offsetTop)) {
      y = -abs(element.offsetTop);
    }
    element.style.transform = `translate(${x}px, ${y}px)`;
  };

  element.addEventListener('mouseenter', () => {
    let offsetX = 0;
    let offsetY = 0;
    let drag = false;
    element.addEventListener('mousedown', e => {
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      drag = true;
    });

    body.addEventListener('mousemove', e => {
      if (drag) {
        translateObject(e, element, height, width, body, offsetX, offsetY);
      }
    });

    body.addEventListener('mouseup', () => {
      drag = false;
    });
  });
};

dragAndDrop(rectangle, 50, 50);
dragAndDrop(circle, 80, 80);
