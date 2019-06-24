const body = document.body;

const rectangle = document.createElement('div');
rectangle.style.width = '150px';
rectangle.style.height = '50px';
rectangle.style.backgroundColor = '#5cc9f5';
body.appendChild(rectangle);

const circle = document.createElement('div');
circle.style.width = '80px';
circle.style.height = '80px';
circle.style.borderRadius = '50%';
circle.style.backgroundColor = '#6638f0';
body.appendChild(circle);

const square = document.createElement('div');
square.style.width = '50px';
square.style.height = '50px';
square.style.backgroundColor = '#4af2a1';
square.style.position = 'relative';
body.appendChild(square);

const abs = num => {
  if (num < -1) {
    return num * -1;
  }
  return num;
};

const dragAndDrop = element => {
  const height = parseInt(element.style.height, 10);
  const width = parseInt(element.style.width, 10);
  const translateObject = ({
    e,
    element,
    width,
    height,
    offsetX, // offset from click
    offsetY
  }) => {
    //console.log(element.offsetTop); // initial y position
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
    element.style.transform = `translate(${x}px, ${y}px)`; // translates form the top corner of the div
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
        translateObject({ e, element, width, height, offsetX, offsetY });
      }
    });
    body.addEventListener('mouseup', () => {
      drag = false;
    });
  });
};

const move = element => {
  const height = parseInt(element.style.height, 10);
  const width = parseInt(element.style.width, 10);
  let x = 100;
  const maxPos = 500;
  element.style.left = x + 'px';

  // let moveRight = setInterval(() => {
  //   if (x + width < body.clientWidth) {
  //     x++;
  //     element.style.left = x + 'px';
  //   } else {
  //     clearInterval(moveRight);
  //   }
  //   console.log(x);
  // }, 1);

  let moveLeft = setInterval(() => {
    if (x > 0) {
      x--;
      element.style.left = x + 'px';
    } else {
      clearInterval(moveLeft);
    }
  }, 1);

  let y = 0;
  setInterval(() => {
    if (y < maxPos) {
      y++;
      element.style.top = y + 'px';
    }
  }, 50);
};

dragAndDrop(rectangle);
dragAndDrop(circle);
dragAndDrop(square);
move(square);
