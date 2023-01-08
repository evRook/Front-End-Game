// TO-DO :
//  -add sounds
//  -remove start reset: have it only open page: power button is new start button
//  -fix power button edge case
//  -fix class names so theyre easier to follow
//  - if time after loss add no color pause before rest style

let buttons = document.querySelector('.js-game--btn__container')
let allButtons = document.querySelectorAll('.js-game--btn')
let startButton = document.querySelector('.js-startGame')
let startScreen = document.querySelector('.js-startScreen')
let quit = document.querySelector('.js-quit--btn')
let startGame = document.querySelector('.js-restart--btn')
let powerBtn = document.querySelector('.js-power--btn')
let scoreScreen = document.querySelector('.js-screen1')
let highScoreScreen = document.querySelector('.js-screen2')
let compStoredColors = []
let playerStoredColors = []
let counter = 0;
let score = 0;
let highScore = 0;
let timer = 0;
let powerOff = true
let canClick = false
let canClickStart = false
let i = 0
let n = 0

let btnColors = {
    red: {
        active: 'red',
        inactive: 'darkred',
    },
    blue: {
        active: 'blue',
        inactive: 'darkblue',
    },
    green: {
        active: 'green',
        inactive: 'darkgreen',
    },
    goldenrod: {
        active: 'goldenrod',
        inactive: 'darkgoldenrod',
    },
}

//Opens game// makes sure game is off
startButton.addEventListener('click', () => {
    powerOff = true
    scoreScreen.innerText = null

    setTimeout(() => {
        startScreen.style.display = 'none'
    }, 100); // change this after adding loading dots

    allButtons.forEach((btn) => {
        btn.style.backgroundColor = 'black'
        btn.style.borderColor = 'rgb(44, 44, 44)'
    });    
});

powerBtn.addEventListener('click',() => {
    if(powerOff === true){
        reset();
        highScoreScreen.innerText = highScore

        setTimeout(() => {
            startLights();
        }, 100);
    }else{
        powerOff = true
        n = 0
        scoreScreen.innerText = null
        highScoreScreen.innerText = null

        setTimeout(() => {
            allButtons.forEach(function(btn){
                btn.style.backgroundColor = 'black'
                btn.style.borderColor = 'rgb(44, 44, 44)'
            },100);
        });
    }

    if(powerOff === false){
            n = 0
        setTimeout(styleReset,1600);
        canClickStart = true
    }
});

startGame.addEventListener('click', () => {
    if(powerOff === false && canClickStart == true){
        reset();
        styleReset();
        compChooses();
        lightButtons();
    }
});

buttons.addEventListener('click', (evt) => {
    if(powerOff === false && canClick === true){
    let activeColor = evt.target.getAttribute('data-color')
    let inactiveColor = evt.target.getAttribute('data-original')

    playerStoredColors.push(activeColor);
    evt.target.style.backgroundColor = `${activeColor}`

    setTimeout(() => {
        evt.target.style.backgroundColor = `${inactiveColor}`
    }, 150);

    gameLogic();
    }
});

quit.addEventListener('click', () => {
    startScreen.style.display = 'block'
});



function startLights(){
    setTimeout(() => {
        allButtons.forEach((btn) => {
            btn.style.backgroundColor = `darkgrey`
            btn.style.borderColor = `rgb(44, 44, 44)`
        });
    },300);

    setTimeout(() => {
        allButtons.forEach((btn) => {
            btn.style.backgroundColor = `black`
            btn.style.borderColor = `rgb(44, 44, 44)`
            
            if(n<3){
                n++
                startLights();
            }
        });
    },600);
}

//turns btnColors into and array then pushes random value to new array to end of sequince
function compChooses(){
    let randomColor = Object.entries(btnColors);
    compStoredColors.push(randomColor[Math.floor(Math.random() * randomColor.length)]);
}

function lightButtons() {
    canClickStart = false
    canClick = false
    function lightLoop() {
        
        setTimeout(() => {
            let getButton = document.getElementById(`${compStoredColors[i][0]}Btn`);
            let activeColor = `${compStoredColors[i][1].active}`
            getButton.style.backgroundColor = `${activeColor}`
            i++
            timer = i
        }, 400);

        setTimeout(() => {
            styleReset();          
            if(i < compStoredColors.length){
                lightLoop();
            }else{
                canClick = true
                canClickStart = true
            }
        }, 700);
    }
    lightLoop();
}

function gameLogic() {
    if(compStoredColors[counter][0] === playerStoredColors[counter]){
        counter += 1;
        if(compStoredColors.length === counter){
            playerStoredColors = [];
            counter = 0;
            i = 0;
            score += 1;
            scoreScreen.innerText = score
            compChooses();
            lightButtons();
        }
    }else{
        if(score > highScore){
            highScore = score
            highScoreScreen.innerText = highScore
        }
        reset();
        gameOver();
    }
}

function gameOver() {
    let m = 0 
    function gameOverLights() {
        setTimeout(() => {
            canClick = false

            allButtons.forEach((btn) => {
                btn.style.backgroundColor = 'red' 
                btn.style.borderColor = 'darkred'
            });
        }, 300);

        setTimeout(() => {
            allButtons.forEach((btn) => {
                btn.style.backgroundColor = 'darkred' 
                btn.style.borderColor = 'darkred'
                
                if(m<5){
                    m++
                    gameOverLights();
                }
            });
        }, 500);
    }
    gameOverLights();

    setTimeout(() => {
        styleReset(); 
        canClickStart = true
    }, 1700);
}

function reset() {
    powerOff = false
    canClick = false
    scoreScreen.innerText = 0
    compStoredColors = [];
    playerStoredColors = [];
    i = 0
    counter = 0
    score = 0
    scoreScreen.innerText = 0
}

function styleReset() {
    allButtons.forEach((btn) => {
        btn.style.backgroundColor = null
        btn.style.borderColor = null
    }) 
}