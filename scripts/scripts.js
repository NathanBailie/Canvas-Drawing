"use strict"

let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

// Here we can change the drawing style
let joiningStyleInput = document.querySelector('#joiningStyle');
let endingStyleInput = document.querySelector('#endingStyle');
let joiningStyle = joiningStyleInput.value;
let endingStyle = endingStyleInput.value;
ctx.lineJoin = joiningStyle;
ctx.lineCap = endingStyle;

joiningStyleInput.addEventListener('change', function (e) {
    ctx.lineJoin = e.target.value;
});

endingStyleInput.addEventListener('change', function (e) {
    ctx.lineCap = e.target.value;
});

// Here we can change the width of the line and its color
let thicknessInput = document.querySelector('#thickness');
let colorInput = document.querySelector('#color');
let thickness = thicknessInput.value;
let color = colorInput.value;
ctx.lineWidth = thickness;
ctx.strokeStyle = color;

thicknessInput.addEventListener('input', function (e) {
    ctx.lineWidth = e.target.value;
});

colorInput.addEventListener('input', function (e) {
    color = e.target.value;
});

// Here we can clear the canvas
let resetButton = document.querySelector('.reset');

resetButton.addEventListener('click', function (e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Here are the variables and functionality needed for drawing
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
