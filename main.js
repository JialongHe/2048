export var board;
export var score;
import './keyboard.js';
import {getNumberBackgroundColor, getNumberColor, getPosTop, getPosLeft} from './helpers.js'

export function init() {
    board = Array.from({length: 4}, () => Array(4).fill(0));
    score = 0;
    updateScoreDisplay();

    updateBoardView();
    generateNumber();
    generateNumber();
}

window.init = init;

function updateBoardView() {
    const gridContainer = document.querySelector('#grid-container');
    gridContainer.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const backgroundCell = document.createElement(`div`);
            backgroundCell.className = 'background-cell';
            backgroundCell.id = `background-cell-${i}-${j}`;
            backgroundCell.style.top = getPosTop(i);
            backgroundCell.style.left = getPosLeft(j);
            gridContainer.appendChild(backgroundCell);

            const cell = document.createElement(`div`);
            cell.className = 'grid-cell';
            cell.id = `grid-cell-${i}-${j}`;
            cell.style.top = getPosTop(i);
            cell.style.left = getPosLeft(j);
            gridContainer.appendChild(cell);
        }
    }
    updateCellValues();
}

function updateCellValues() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.getElementById(`grid-cell-${i}-${j}`);
            const number = board[i][j];
            cell.textContent = number !== 0 ? number : '';
            cell.style.backgroundColor = getNumberBackgroundColor(number);
            cell.style.color = getNumberColor(number);
        }
    }
}

export function generateNumber() {
    let emptyPositions = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                emptyPositions.push({row: row, col: col});
            }
        }
    }
    if (emptyPositions.length > 0) {
        let {row, col} = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
        let randNumber = Math.random() < 0.9 ? 2 : 4;
        board[row][col] = randNumber;
    }
    updateCellValues();
}

export function addScore (n) {
    score += n;
}

export function updateScoreDisplay() {
    const scoreElement = document.querySelector('#score');
    scoreElement.textContent = score;
}