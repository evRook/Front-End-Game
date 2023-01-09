let buttons = document.querySelector('.js-game--btn__container')    //button container
let allButtons = document.querySelectorAll('.js-game--btn')         //all buttons in an array
let startButton = document.querySelector('.js-startGame')           //start button on title screen
let startScreen = document.querySelector('.js-startScreen')         //title screen container
let quit = document.querySelector('.js-quit--btn')                  //quit button
let startGame = document.querySelector('.js-restart--btn')          //control panel start button
let powerBtn = document.querySelector('.js-power--btn')             //control panel power button
let scoreScreen = document.querySelector('.js-screen1')             //left score screen
let highScoreScreen = document.querySelector('.js-screen2')         //right score screen
let playerLight = document.querySelector('.js-player--light')       //player turn light
let compLight = document.querySelector('.js-comp--light')           //comp turn light
let logoLight = document.querySelector('.js-game--logo')            //control panel logo
let powerTxtLight = document.querySelector('.js-power--txt')        //control panel power text
let startTxtLight = document.querySelector('.js-restart--txt')      //control panel start text
let info = document.querySelector('.js-info--modal__container')     //info modal container
let infoBtn = document.querySelector('.js-modal--btn')              //"?" info button
let infoClose = document.querySelector('.js-info--modal--close')    //close modal button
let compStoredColors = []                                           //array to hold comps sequence
let playerStoredColors = []                                         //array to hold players clicked colors
let counter = 0;                                                    //used to check if end of round
let score = 0;                                                      //used to show score
let highScore = 0;                                                  //used to show high score
let timer = 0;                                                      //NOT ACTIVE: used to time exponential decay
let powerOff = true                                                 //used to tell if power is on or off
let canClick = false                                                //used to prevent clicking during computers turn / clicking too fast on your turn
let canClickStart = false                                           //used to prevent start button from working while other functions are running
let modalOpen = false                                               //used to tell if info modal is open or closed
let i = 0                                                           //used for lighting proper buttons and game logic     
let n = 0                                                           //start lights counter
let clickSound = new Audio()                                        //Audio constructors vvv
let menuSound = new Audio()
let wrongSound = new Audio()
let redSound = new Audio()
let blueSound = new Audio()
let greenSound = new Audio()
let yellowSound = new Audio()                                       //Audio constructors ^^^

let btnColors = {                                                   //button colors: used for ony compChooses()
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


//Event Listeners//

//Opens game// makes sure game is off 
startButton.addEventListener('click', () => {
    menuClickSound()
    powerOff = true
    scoreScreen.innerText = null                // clears score screen
    startScreen.style.display = 'none'          // closes title screen

    allButtons.forEach((btn) => {               // makes all buttons style "off"
        btn.style.backgroundColor = 'black'
        btn.style.borderColor = 'rgb(44, 44, 44)'
    });    
});

//Turns game on// adds styling acording to "on"/"off" status // makes sure game status is reset
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
        startLights();
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

    //sets buttons to colored after startup sequence
    if(powerOff === false){
            n = 0
        setTimeout(styleReset,1600);
        canClickStart = true
    }
});

//Starts Game// makes sure game status is reset
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

//adds clicked button color to array for game logic & lights clicked buttons
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

//Quits to title// makes sure game is off and info modal is closed
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

//Opens info modal// logic to tell if modal is already open
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

//Closes modal// button in modal
infoClose.addEventListener('click', () => {
    menuClickSound()
    info.style.display = 'none'
    modalOpen = false
});


//Functions//

//Light sequence for power "on"
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

//turns btnColors into and array then pushes random value to end of array(compStoredColors)
function compChooses(){
    let randomColor = Object.entries(btnColors);
    compStoredColors.push(randomColor[Math.floor(Math.random() * randomColor.length)]);
}

//Game light sequence// 
function lightButtons() {
    canClickStart = false
    canClick = false

    //turn indicator lights
    playerLight.style.background = null
    compLight.style.background = 'radial-gradient(rgb(255, 0, 0), rgb(0, 0, 0))'
    
    //loops through compStoredColors to create the computers light sequence
    function lightLoop() {
        setTimeout(() => {
            let getButton = document.getElementById(`${compStoredColors[i][0]}Btn`);
            let activeColor = `${compStoredColors[i][1].active}`
            getButton.style.backgroundColor = `${activeColor}`

            //button sound logic
            if(activeColor == 'red'){
                redBtnSound()
            }else if(activeColor == 'blue'){
                blueBtnSound()
            }else if(activeColor == 'green'){
                greenBtnSound()
            }else if(activeColor == 'goldenrod'){
                yellowBtnSound()
            }

            i++
            timer = i // NOT ACTIVE
        }, 300);

        setTimeout(() => {

            //resets colors to default after being made active
            styleReset();
            
            //loops lights untill end of sequence
            if(i < compStoredColors.length){
                lightLoop();
            }else{
                canClick = true
                canClickStart = true
                //turn indicator lights
                playerLight.style.background = 'radial-gradient(rgb(255, 0, 0), rgb(0, 0, 0))'
                compLight.style.background = null
            }
        }, 600);
    }
    lightLoop();
}

//checks if players clicked button matches the computers sequence
function gameLogic() {
    
    if(compStoredColors[counter][0] === playerStoredColors[counter]){
        counter += 1;
        //if statement to check if end of round :: WIN
        if(compStoredColors.length === counter){
            playerStoredColors = [];    //resets players choices for next round
            counter = 0;                //resets counter
            i = 0;                      //resets 'i' for lightButtons
            score += 1;                 //adds 1 to scorre after each won round
            scoreScreen.innerText = score
            compChooses();              //starts next round
            lightButtons();
        }
    }else{                              //if statement to check if end of round :: LOSS
        if(score > highScore){          //sets high score 
            highScore = score
            highScoreScreen.innerText = highScore
        }
        wrongAnswerSound();
        reset();
        gameOver();                     //runs game over light sequence
    }
}

//Game Over light sequence//
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

    // sets lights back to default after game over light sequence
    setTimeout(() => {
        styleReset(); 
        playerLight.style.background = null //turns off turn indicators
        compLight.style.background = null
        canClickStart = true    //allows start to be clicked
        startTxtLight.classList.add('js-light--active') //turns start light on
    }, 1700);
}

//condensed reset into a function
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

//condensed default colors reset
function styleReset() {
    allButtons.forEach((btn) => {
        btn.style.backgroundColor = null
        btn.style.borderColor = null
    }) 
}


//Audio Play:Pause//

function wrongAnswerSound() {
    wrongSound.src = 'audio/Incorrect.wav' //gets audio source
    wrongSound.play()   //plays audio
}

function redBtnSound() {
    redSound.src = 'audio/Button1.wav'
    redSound.play()
    setTimeout(() => {      //timer to pause audio and reset audio clip to the beginning
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