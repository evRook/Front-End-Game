let buttons = document.querySelector('.js-game--btn__container')
let allButtons = document.querySelectorAll('.js-game--btn')
let startButton = document.querySelector('.js-startGame')
let startScreen = document.querySelector('.js-startScreen')
let quit = document.querySelector('.js-quit--btn')
let startGame = document.querySelector('.js-restart--btn')
let powerBtn = document.querySelector('.js-power--btn')
let scoreScreen = document.querySelector('.js-screen1')
let highScoreScreen = document.querySelector('.js-screen2')
let playerLight = document.querySelector('.js-player--light')
let compLight = document.querySelector('.js-comp--light')
let logoLight = document.querySelector('.js-game--logo')
let powerTxtLight = document.querySelector('.js-power--txt')
let startTxtLight = document.querySelector('.js-restart--txt')
let info = document.querySelector('.js-info--modal__container')
let infoBtn = document.querySelector('.js-modal--btn')
let infoClose = document.querySelector('.js-info--modal--close')
let compStoredColors = []
let playerStoredColors = []
let counter = 0;
let score = 0;
let highScore = 0;
let timer = 0;
let powerOff = true
let canClick = false
let canClickStart = false
let modalOpen = false
let i = 0
let n = 0
let clickSound = new Audio()
let menuSound = new Audio()
let wrongSound = new Audio()
let redSound = new Audio()
let blueSound = new Audio()
let greenSound = new Audio()
let yellowSound = new Audio()

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

    menuClickSound()

    setTimeout(() => {
        startScreen.style.display = 'none'
    }, 100);

    allButtons.forEach((btn) => {
        btn.style.backgroundColor = 'black'
        btn.style.borderColor = 'rgb(44, 44, 44)'
    });    
});

powerBtn.addEventListener('click',() => {
    if(powerOff === true){
        buttonClickSound()
        reset();
        highScoreScreen.innerText = highScore
        scoreScreen.style.boxShadow = 'inset 0 0 5px red'
        highScoreScreen.style.boxShadow = 'inset 0 0 5px red'
        playerLight.style.background = 'radial-gradient(rgb(255, 0, 0), rgb(0, 0, 0))'
        compLight.style.background = 'radial-gradient(rgb(255, 0, 0), rgb(0, 0, 0))'
        logoLight.classList.add('js-light--active')
        powerTxtLight.classList.add('js-light--active')
        startTxtLight.classList.add('js-light--active')

        setTimeout(() => {
            startLights();
        }, 100);
    }else{
        buttonClickSound()
        powerOff = true
        n = 0
        scoreScreen.innerText = null
        highScoreScreen.innerText = null
        playerLight.style.background = null
        compLight.style.background = null
        scoreScreen.style.boxShadow = null
        highScoreScreen.style.boxShadow = null
        powerTxtLight.classList.remove('js-light--active')
        logoLight.classList.remove('js-light--active')
        startTxtLight.classList.remove('js-light--active')

        allButtons.forEach(function(btn){
            btn.style.backgroundColor = 'black'
            btn.style.borderColor = 'rgb(44, 44, 44)'
        });
    }

    if(powerOff === false){
            n = 0
        setTimeout(styleReset,1600);
        canClickStart = true
    }
});

startGame.addEventListener('click', () => {
        buttonClickSound()
    if(powerOff === false && canClickStart == true){
        startTxtLight.classList.remove('js-light--active')
        reset();
        styleReset();
        compChooses();
        lightButtons();
    }
});

buttons.addEventListener('click', (evt) => {
    buttonClickSound()
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
    menuClickSound()
    startScreen.style.display = 'block'
    highScoreScreen.innerText = null
    powerTxtLight.classList.remove('js-light--active')
    logoLight.classList.remove('js-light--active')
    startTxtLight.classList.remove('js-light--active')
    scoreScreen.style.boxShadow = null
    highScoreScreen.style.boxShadow = null
    info.style.display = 'none'
    modalOpen = false
    powerOff = true
});

infoBtn.addEventListener('click', () => {
    menuClickSound()

    if(modalOpen === false){
        info.style.display = 'block'
        modalOpen = true
    }else{
        info.style.display = 'none'
        modalOpen = false
    }
});

infoClose.addEventListener('click', () => {
    menuClickSound()
    info.style.display = 'none'
    modalOpen = false
});


function startLights(){
    setTimeout(() => {
        allButtons.forEach((btn) => {
            btn.style.backgroundColor = `rgb(57, 74, 98)`
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
        playerLight.style.background = null
        compLight.style.background = null
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
    playerLight.style.background = null
    compLight.style.background = 'radial-gradient(rgb(255, 0, 0), rgb(0, 0, 0))'
    function lightLoop() {
        
        setTimeout(() => {
            let getButton = document.getElementById(`${compStoredColors[i][0]}Btn`);
            let activeColor = `${compStoredColors[i][1].active}`
            getButton.style.backgroundColor = `${activeColor}`

            if(activeColor == 'red'){
                redBtnSound()
            }else if(activeColor == 'blue'){
                blueBtnSound()
            }else if(activeColor == 'green'){
                greenBtnSound()
            }else if(activeColor == 'goldenrod'){
                yellowBtnSound()
            }

            // console.log(activeColor)

            i++
            timer = i
        }, 300);

        setTimeout(() => {
            styleReset();          
            if(i < compStoredColors.length){
                lightLoop();
            }else{
                canClick = true
                canClickStart = true
                playerLight.style.background = 'radial-gradient(rgb(255, 0, 0), rgb(0, 0, 0))'
                compLight.style.background = null
            }
        }, 600);
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
        wrongAnswerSound();
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
        playerLight.style.background = null
        compLight.style.background = null
        canClickStart = true
        startTxtLight.classList.add('js-light--active')
    }, 1700);
}

function reset() {
    powerOff = false
    canClick = false
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

function wrongAnswerSound() {
    wrongSound.src = 'audio/Incorrect.wav'
    wrongSound.play()
}

function redBtnSound() {
    redSound.src = 'audio/Button1.wav'
    redSound.play()
    setTimeout(() => {
        redSound.pause()
        redSound.currentTime = 0
    },500)
}

function blueBtnSound() {
    blueSound.src = 'audio/Button2.wav'
    blueSound.play()
    setTimeout(() => {
        blueSound.pause()
        blueSound.currentTime = 0
    },500)
}

function greenBtnSound() {
    greenSound.src = 'audio/Button4.wav'
    greenSound.play()
    setTimeout(() => {
        greenSound.pause()
        greenSound.currentTime = 0
    },500)
}

function yellowBtnSound() {
    yellowSound.src = 'audio/Button5.wav'
    yellowSound.play()
    setTimeout(() => {
        yellowSound.pause()
        yellowSound.currentTime = 0
    },500)
}

function menuClickSound() {
    menuSound.src = 'audio/Menu.wav'
    menuSound.play()
}

function buttonClickSound() {
    clickSound.src = 'audio/ButtonClick.wav'
    clickSound.play()
}