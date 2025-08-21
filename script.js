function appendCharacter(char) {
    document.getElementById('result').value += char;
}

function clearDisplay() {
    document.getElementById('result').value = '';
}

function deleteLast() {
    let result = document.getElementById('result').value;
    document.getElementById('result').value = result.slice(0, -1);
}

function calculateResult() {
    let result = document.getElementById('result').value;
    try {
        document.getElementById('result').value = eval(result);
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}

document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

// Make the calculator draggable
dragElement(document.getElementById("calculator"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Make the calculator resizable
resizeElement(document.getElementById("calculator"));

function resizeElement(elmnt) {
    var resizeHandle = elmnt.querySelector(".resize-handle");
    var startX, startY, startWidth, startHeight;

    resizeHandle.onmousedown = function(e) {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(elmnt).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(elmnt).height, 10);
        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
    };

    function doDrag(e) {
        elmnt.style.width = (startWidth + e.clientX - startX) + 'px';
        elmnt.style.height = (startHeight + e.clientY - startY) + 'px';
    }

    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
}

// Open/close functionality
document.getElementById('calculatorIcon').addEventListener('click', function() {
    document.getElementById('calculator').style.display = 'block';
});

document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('calculator').style.display = 'none';
});
