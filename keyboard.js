import { board, init, generateNumber, addScore, updateScoreDisplay } from "./main.js";

window.onclick = function(event) {
    const modal = document.getElementById('gameOverModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    
    const newGameButton = document.getElementById('newGameButton');
    newGameButton.addEventListener('click', (event) => {
        event.preventDefault();
        init();
    });
});

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
});

function moveUp() {
    for (let col = 0; col < 4; col++) {
        let currentCol = [board[0][col], board[1][col], board[2][col], board[3][col]];
        let { line: newCol, movements } = slideAndCombine(currentCol);
        movements.forEach(movement => {
            if (movement.from !== movement.to) {
                animateTileMovement(movement.from, col, movement.to, col);
            }
        });
        for (let row = 0; row < 4; row++) {
            board[row][col] = newCol[row];
        }
    }
    generateNumber();
    isGameOver();
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        let currentCol = [board[3][col], board[2][col], board[1][col], board[0][col]];
        let { line: newCol, movements } = slideAndCombine(currentCol);
        movements.forEach(movement => {
            if (movement.from !== movement.to) {
                animateTileMovement(3 - movement.from, col, 3 - movement.to, col);
            }
        });
        for (let row = 0; row < 4; row++) {
            board[3 - row][col] = newCol[row];
        }
    }
    generateNumber();
    isGameOver();
}

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let currentRow = board[row];
        let { line: newRow, movements } = slideAndCombine(currentRow);

        movements.forEach(movement => {
            if (movement.from !== movement.to) {
                animateTileMovement(row, movement.from, row, movement.to);
            }
        });
        board[row] = newRow;
    }
    generateNumber();
    isGameOver();
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        let currentRow = board[row].slice().reverse();
        let { line: newRow, movements } = slideAndCombine(currentRow);
        movements.forEach(movement => {
            if (movement.from !== movement.to) {
                animateTileMovement(row, 3 - movement.from, row, 3 - movement.to);
            }
        });
        board[row] = newRow.reverse();
    }
    generateNumber();
    isGameOver();
}

function slideAndCombine(line) {
    let filtered = line.filter(num => num);
    let movements = [];

    for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
            filtered[i] *= 2;
            addScore(filtered[i]);
            filtered[i + 1] = 0;
            movements.push({ from: i + 1, to: i });
        }
    }
    let combined = filtered.filter(num => num);
    while (combined.length < 4) {
        combined.push(0);
    }
    combined.forEach((value, index) => {
        if (line[index] !== value) {
            movements.push({ from: index, to: combined.indexOf(value) });
        }
    });
    updateScoreDisplay();
    return { line: combined, movements };
}

function animateTileMovement(fromRow, fromCol, toRow, toCol) {
    const cell = document.getElementById(`grid-cell-${fromRow}-${fromCol}`);
    if (cell) {                                                                                                   
        cell.style.setProperty('--start-x', `${20 + fromCol * 120}px`);
        cell.style.setProperty('--start-y', `${20 + fromRow * 120}px`);
        cell.style.setProperty('--end-x', `${20 + toCol * 120}px`);
        cell.style.setProperty('--end-y', `${20 + toRow * 120}px`);
        cell.classList.add('moving');
    }
}

document.addEventListener('animationend', function(event) {
    if (event.target.classList.contains('moving')) {
        event.target.classList.remove('moving');
    }
});

function isGameOver() {
    if (noSpace(board) && noMovesLeft()) {
        alertGameOver();
    }
}

function noSpace(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function noMovesLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i > 0 && board[i][j] === board[i - 1][j]) {
                return false;
            }
            if (i < 3 && board[i][j] === board[i + 1][j]) {
                return false;
            }
            if (j > 0 && board[i][j] === board[i][j - 1]) {
                return false;
            }
            if (j < 3 && board[i][j] === board[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

function alertGameOver() {
    const modal = document.getElementById('gameOverModal');
    const restartButton = document.getElementById('restartButton');

    modal.style.display = 'block';

    restartButton.onclick = function() {
        modal.style.display = 'none';
        init();
    };
}