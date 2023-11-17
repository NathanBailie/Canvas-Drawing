"use strict"

let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

let resetButton = document.querySelector('.reset');
let thicknessInput = document.querySelector('#thickness');
let colorInput = document.querySelector('#color');
let thickness = thicknessInput.value;
let color = colorInput.value;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = colorInput.value;
ctx.lineWidth = thicknessInput.value;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function onDraw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', onDraw);

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// change thickness and color
thicknessInput.addEventListener('input', function (e) {
    ctx.lineWidth = e.target.value;
});

colorInput.addEventListener('input', function (e) {
    color = e.target.value;
});

// reset canvas
resetButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})
