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

// Notes App
const notesContent = document.getElementById('notes-content');

// Load saved notes
if (localStorage.getItem('notes')) {
    notesContent.value = localStorage.getItem('notes');
}

// Save notes on input
notesContent.addEventListener('input', function() {
    localStorage.setItem('notes', notesContent.value);
});

// Make the notes app draggable and resizable
dragElement(document.getElementById("notes-app"));
resizeElement(document.getElementById("notes-app"));

// Open/close functionality for notes app
document.getElementById('notesIcon').addEventListener('click', function() {
    document.getElementById('notes-app').style.display = 'flex';
});

document.getElementById('closeNotesButton').addEventListener('click', function() {
    document.getElementById('notes-app').style.display = 'none';
});

// Tic Tac Toe Game
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('tictactoe-status');
const restartButton = document.getElementById('tictactoe-restart');
const x_class = 'x';
const circle_class = 'circle';
let circleTurn;

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusText.innerText = `X's turn`;
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circle_class : x_class;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        statusText.innerText = 'Draw!';
    } else {
        statusText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass === x_class ? 'X' : 'O';
}

function swapTurns() {
    circleTurn = !circleTurn;
    statusText.innerText = `${circleTurn ? "O's" : "X's"} turn`;
}

function setBoardHoverClass() {
    const board = document.getElementById('tictactoe-board');
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if (circleTurn) {
        board.classList.add(circle_class);
    } else {
        board.classList.add(x_class);
    }
}

function checkWin(currentClass) {
    return winning_combinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

// Make the tictactoe app draggable and resizable
dragElement(document.getElementById("tictactoe-app"));
resizeElement(document.getElementById("tictactoe-app"));

// Open/close functionality for tictactoe app
document.getElementById('tictactoeIcon').addEventListener('click', function() {
    document.getElementById('tictactoe-app').style.display = 'flex';
});

document.getElementById('closeTictactoeButton').addEventListener('click', function() {
    document.getElementById('tictactoe-app').style.display = 'none';
});

// Settings App
const wallpaperOptions = document.querySelectorAll('[data-wallpaper]');

// Load saved wallpaper
if (localStorage.getItem('wallpaper')) {
    document.body.style.backgroundImage = `url('${localStorage.getItem('wallpaper')}')`;
}

wallpaperOptions.forEach(option => {
    option.addEventListener('click', function() {
        const wallpaperUrl = this.src;
        document.body.style.backgroundImage = `url('${wallpaperUrl}')`;
        localStorage.setItem('wallpaper', wallpaperUrl);
    });
});

// Make the settings app draggable and resizable
dragElement(document.getElementById("settings-app"));
resizeElement(document.getElementById("settings-app"));

// Open/close functionality for settings app
document.getElementById('settingsIcon').addEventListener('click', function() {
    document.getElementById('settings-app').style.display = 'flex';
});

document.getElementById('closeSettingsButton').addEventListener('click', function() {
    document.getElementById('settings-app').style.display = 'none';
});

// Browser App
// Make the browser app draggable and resizable
dragElement(document.getElementById("browser-app"));
resizeElement(document.getElementById("browser-app"));

// Open/close functionality for browser app
document.getElementById('browserIcon').addEventListener('click', function() {
    document.getElementById('browser-app').style.display = 'flex';
});

document.getElementById('closeBrowserButton').addEventListener('click', function() {
    document.getElementById('browser-app').style.display = 'none';
});
