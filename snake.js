const gameBoard = document.querySelector('.gameBoard');;
const gameScore = document.querySelector('.score');
const speedText = document.querySelector('.speed');
const currentHighestScore = document.querySelector('.highScore');
const controls= document.querySelectorAll('.phoneControls i');

let foodX,foodY;
let snakeX =15,snakeY=15;
let directionX=0, directionY=0;
let speed=200;
let currentScore=0;
let snakeBody=[];
let gameOver=false;
let setIntervalId;
let currentSpeed=1
let highestScoreLocal= localStorage.getItem('highestScoreLocal') || 0;

currentHighestScore.innerHTML=highestScoreLocal

function changeFoodPos (){
    
    foodX = Math.floor(Math.random()*30) +1;
    foodY = Math.floor(Math.random()*30) +1;
}


function init(){

    if (gameOver) return gameState();

    let position = `<div class="food" style="grid-area: ${foodX} / ${foodY}"></div>`;

    
    snakeX+=directionX;
    snakeY+=directionY;
    
    if(snakeX <=0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver=true;
    }
    
    for (let i =snakeBody.length -1;i>0; i--) {
        snakeBody[i]=snakeBody[i-1];
    }

    if(snakeX===foodX && snakeY===foodY){
        changeFoodPos();
        score();
        snakeBody.push({foodX,foodY})
        clearInterval(setIntervalId);
        speed-=10;
        currentSpeed+=1
        gameEngine();
        
    }
    
    snakeBody[0]=[snakeY,snakeX];

    for(let i=0;i<snakeBody.length;i++){

        position += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
     
        if(i != 0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0]){
            gameOver=true;
        }

    }
    gameBoard.innerHTML = position;
}

const changeDirection = (e)=>{
    if (e.key ==='ArrowUp' && directionX !=1){
        directionX=-1;
        directionY=0;
    }
    if (e.key ==='ArrowDown' && directionX !=-1){
        directionX=1;
        directionY=0;
    }
    if (e.key ==='ArrowRight' && directionY !=-1){
        directionX=0;
        directionY=1;
    }
    if (e.key ==='ArrowLeft' && directionY !=1){
        directionX=0;
        directionY=-1;
    }

}

controls.forEach(key => {
    key.addEventListener('click',() => changeDirection({ key: key.dataset.key}))
})

function score(){

    currentScore++;
    gameScore.innerHTML=currentScore;
    speedText.innerHTML=currentSpeed;

    highestScoreLocal = currentScore >= highestScoreLocal? currentScore : highestScoreLocal 
    localStorage.setItem('highestScoreLocal', highestScoreLocal);
    currentHighestScore.innerHTML=currentScore;
}

function gameState(){
    const gameOverPannel= document.querySelector('.gameOverPannel')
    const restartButton= document.querySelector('.restartButton')

    gameOverPannel.classList.remove('hidden')
    restartButton.addEventListener('click',()=>{
        window.location.reload();
    })
}

changeFoodPos();
function gameEngine(){
    setIntervalId=setInterval(init, speed);
}

gameEngine();

document.addEventListener('keydown', changeDirection);