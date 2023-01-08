// TO-DO :
//  -change all classes to js-classes
//  -change colors to hex code
//  -chage button colors to proper positions
//  -add sounds
//  -connect power button
//      -add fashing to power button
//      -add rest and functionality to power button
//  -remove start reset: have it only open page: power button is new start button
//  -connect score to html
//  -connect high score to html
//      -need to be created
//  - condense object.entries to one let var





let buttons = document.querySelector('.game--btn__container')
let allButtons = document.querySelectorAll('.game--btn')
let startButton = document.querySelector('.startGame')
let antiClick = document.querySelector('.antiClick')
let startScreen = document.querySelector('.startScreen')
let quit = document.querySelector('.quit--btn')
let startGame = document.querySelector('.restart--btn')
let powerBtn = document.querySelector('.power--btn')
let scoreScreen = document.querySelector('.score--screen')
let compStoredColors = []
let playerStoredColors = []
let counter = 0;
let score = 0;
let highScore = 0;
let timer = 0;
let powerOff = true
let canClick = false
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



//START GAME: clears data and has computer coose
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

startGame.addEventListener('click', () => {
    if(powerOff === false){
        reset();
        styleReset();
        compChooses();
        lightButtons();
    }
});

quit.addEventListener('click', () => {
    startScreen.style.display = 'block'
});

powerBtn.addEventListener('click',() => {
    if(powerOff === true){
        reset();

        setTimeout(() => {
            startLights();
        }, 100);

    }else{
        powerOff = true
        n = 0
        scoreScreen.innerText = null

        setTimeout(() => {
            allButtons.forEach(function(btn){
                btn.style.backgroundColor = 'black'
                btn.style.borderColor = 'rgb(44, 44, 44)'
            },100);
        });
    }

    if(powerOff === false){
            n = 0
        setTimeout((btn) => {
            styleReset();
        },1600);
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

//turns btnColors into and array then pushes random value to new array
function compChooses(){
    let randomColor = Object.entries(btnColors);
    compStoredColors.push(randomColor[Math.floor(Math.random() * randomColor.length)]);
}

function lightButtons() {
    function lightLoop() {
        
        setTimeout(() => {
            canClick = false
            let getButton = document.getElementById(`${compStoredColors[i][0]}Btn`);
            activeColor = `${compStoredColors[i][1].active}`
            getButton.style.backgroundColor = `${activeColor}`
            i++
            timer = i
        }, 800 - (timer * 20));

        setTimeout(() => {
            styleReset();          
            if(i < compStoredColors.length){
                lightLoop();
            }else{
                canClick = true
            }
        }, 1200 - (timer * 20));
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