const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#reset');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
let boardBackGround = 'white';
let snakeBorder = 'black';
let snakeColor = 'lightgreen';
let foodColor = 'red';
let unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

let snake = [
    {x: unitSize*4, y: 0},
    {x: unitSize*3, y: 0},
    {x: unitSize*2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0},
];

resetBtn.addEventListener('click', resetGame);
window.addEventListener('keydown', changeDirection);
startGame();
function startGame(){
    scoreText.textContent = score;
    running = true;
    createFood();
    drawFood();
   
    nextTick();
};
function nextTick(){
    setTimeout(()=>{
        if(running){
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }
        else{
            displayGameOver();
        }
    }, 75)
};
function createFood(){
    function random(min, max){
        let randNum = Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randNum;
    }
    foodX = random(0, gameWidth-unitSize);
    foodY = random(0, gameWidth-unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
    
};
function clearBoard(){
    ctx.fillStyle = boardBackGround;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((snakePart)=>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    if(snake[0].x === foodX && snake[0].y === foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function changeDirection(event){
    let keyPressed = event.keyCode;
    const UP = 38;
    const DOWN = 40;
    const LEFT = 37;
    const RIGHT = 39;
    const goingUp = (yVelocity === -unitSize);
    const goingDown = (yVelocity === unitSize);
    const goingLeft = (xVelocity === -unitSize);
    const goingRight = (xVelocity === unitSize);
    switch(true){
        case(keyPressed === UP && !goingDown):
            yVelocity = -unitSize;
            xVelocity = 0;
             break;
        case(keyPressed === DOWN && !goingUp):
            yVelocity = unitSize;
            xVelocity = 0;
            break;
        case(keyPressed === LEFT && !goingRight):
            xVelocity = -unitSize;    
            yVelocity = 0;
            break;
        case(keyPressed === RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;        
    }
};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            running = false;
            break;
        case(snake[0].x >= gameWidth):
            running = false;
            break;
        case(snake[0].y < 0):
            running = false;
            break;      
        case(snake[0].y >= gameHeight):
            running = false;
            break;       
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = '50px MV BOLI';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', gameWidth/2, gameHeight/2);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x: unitSize*4, y: 0},
        {x: unitSize*3, y: 0},
        {x: unitSize*2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0},
    ];
    startGame();
    running = true;


};
