export const DRAG_KEY = 'dragThiny';
function detectLeftButton(event) {
  if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
    return false;
  } else if ('buttons' in event) {
    return event.buttons === 1;
  } else if ('which' in event) {
    return event.which === 1;
  } else {
    return (event.button == 1 || event.type == 'click');
  }
}

let lastYMin = null;
let lastYMax = null;
let lastXMin = null;
let lastXMax = null;
let lastTStart = null;

// Copied shamelessly from the Internet™, then mangled
export const dragElement = (draggedElement) => {
  let posX1 = 0,
    posY1 = 0,
    posX2 = 0,
    posY2 = 0;
  const stored = JSON.parse(localStorage.getItem(DRAG_KEY) || '{}');
  const {maxHeight} = stored;
  let firstOne = true;
  // Div is rendered by react, hope it's ready in this timeout.
  console.log(stored);
  maxHeight && firstOne && document.addEventListener('click', e=> {
    console.log('clickadfoisdjf')
    if (e.altKey) {
      firstOne = false;
      setTimeout(()=> {
        const ul = draggedElement.querySelector('div > ul');
        console.log(ul);
        ul.style.maxHeight = `${ maxHeight  }px`;
      }, 300);
    }
  })

  draggedElement.onmousedown = dragMouseDown;
  draggedElement.ondragstart = dragMouseDown;

  function dragMouseDown(e) {
    if (!detectLeftButton(e)) {
      return;
    }
    if (e.target.matches('ul *, input')) {
      return;
    }
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    posX2 = e.clientX;
    posY2 = e.clientY;

    lastTStart = Date.now();

    document.onmouseup = closeDragElement;
    document.ondragend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.ondrag = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    draggedElement.classList.add('dragging')
    const maxHeight = window.outerHeight - draggedElement.offsetTop - 177;
    console.log(posX1, posY1, posX2, posY2);
    // calculate the new cursor position:
    posX1 = posX2 - e.clientX;
    posY1 = posY2 - e.clientY;

    posX2 = e.clientX;
    posY2 = e.clientY;

    if (posY1 < 0) {
      // console.log('going down')
      // set the element's new position:
      if (maxHeight > 220 || lastYMax !== null && posY2 < lastYMax) {
        draggedElement.style.top = (draggedElement.offsetTop - posY1) + "px";
      } else {
        if (lastYMax === null) {
          console.log('max Y', posY2);
          console.log('window height', window.outerHeight);
          lastYMax = posY2;
        }
      }
    }

    if (posY1 > 0) {
      // console.log('going up')
      // set the element's new position:
      if (draggedElement.offsetTop > 2 || lastYMax !== null && posY2 > lastYMin) {
        draggedElement.style.top = (draggedElement.offsetTop - posY1) + "px";
      } else {
        console.log(draggedElement.offsetTop, lastYMin)
        if (lastYMin === null) {
          lastYMin = posY2;
        }
      }
    }

    console.log(draggedElement.offsetLeft);

    if (draggedElement.offsetLeft > 4 || posX1 < 0 && posX2 > lastXMin) {
      draggedElement.style.left = (draggedElement.offsetLeft - posX1) + "px";
    } else {
      if (lastXMin === null) {
        lastXMin = posX2;
      }
    }
    localStorage.setItem(DRAG_KEY, JSON.stringify({ x: draggedElement.offsetLeft, y: draggedElement.offsetTop, maxHeight }));

    // console.log(maxH);

    const ul = draggedElement.querySelector('div > ul');
    ul.style.maxHeight = `${ maxHeight  }px`;
  }

  function closeDragElement(event) {
    // stop moving when mouse button is released:
    draggedElement.classList.remove('dragging')
    lastYMin = null;
    lastYMax = null;
    lastXMin = null;
    lastXMax = null;
    const duration = Date.now() - lastTStart;
    console.log(duration);
    lastTStart = null;
    if (duration > 1000) {
      console.log('prevent propagation');
      event.stopImmediatePropagation();
      event.preventDefault();
      event.stopPropagation();
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
}
