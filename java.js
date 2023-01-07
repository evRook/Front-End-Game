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
//  





let buttons = document.querySelector('.game--btn__container')
let allButtons = document.querySelectorAll('.game--btn')
let startButton = document.querySelector('.startGame')
let antiClick = document.querySelector('.antiClick')
let startScreen = document.querySelector('.startScreen')
let quit = document.querySelector('.quit--btn')
let restart = document.querySelector('.restart--btn')
let compStoredColors = []
let playerStoredColors = []
let activeColor;
let inactiveColor;
let counter = 0;
let score = 0;
let highScore = 0;
let timer = '';
let i = 0
let j = 0

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

    startScreen.style.display = 'none'
    antiClick.style.display = 'block'

    compStoredColors = [];
    playerStoredColors = [];
    i = 0
    j = 0
    counter = 0
    score = 0
    compChooses()
    lightButtons()

})

quit.addEventListener('click', () => {

    startScreen.style.display = 'block'

})

restart.addEventListener('click', () => {

    compStoredColors = [];
    playerStoredColors = [];
    i = 0
    j = 0
    counter = 0
    score = 0
    compChooses()
    lightButtons()

})


//turns btnColors into and array then pushes random value to new array
function compChooses(){
    
    let randomColor = Object.entries(btnColors)
    compStoredColors.push(randomColor[Math.floor(Math.random() * randomColor.length)])

}


// does not work with start button ~kinda
function lightButtons() {
    function lightLoop() {
        
        setTimeout(() => {

            antiClick.style.display = 'block'

            let getButton = document.getElementById(`${compStoredColors[i][0]}Btn`)
            activeColor = `${compStoredColors[i][1].active}`
            
            getButton.style.backgroundColor = `${activeColor}`
            // getButton.style.borderColor = `${activeColor}`
            
            i++
            timer = i

            console.log(compStoredColors)
        
        }, 800 - (timer * 20))

        setTimeout(() => {

            let getSameButton = document.getElementById(`${compStoredColors[j][0]}Btn`)
            inactiveColor = `${compStoredColors[j][1].inactive}`
            
            getSameButton.style.backgroundColor = `${inactiveColor}`
            // getSameButton.style.borderColor = `${inactiveColor}`

            
            j++
            
            if(j < compStoredColors.length){
                lightLoop()
            }else{
                antiClick.style.display = 'none'
            }

        }, 1200 - (timer * 20))

    }
    lightLoop()
    
}


// clicking too fast changes backgrounds to wrong color
buttons.addEventListener('click', userInput = (evt) => {

    activeColor = evt.target.getAttribute('data-color')
    inactiveColor = evt.target.getAttribute('data-original')

    playerStoredColors.push(activeColor)

    evt.target.style.backgroundColor = `${activeColor}`

    antiClick.style.display = 'block'

    setTimeout(() => {
        evt.target.style.backgroundColor = `${inactiveColor}`
        antiClick.style.display = 'none'
    }, 150)
     

    gameLogic();

})

buttons.addEventListener('mouseover', () =>{
    allButtons.forEach((btn) => {
        btn.style.backgroundColor = null
        btn.style.borderColor = null
    })
})


// works? needs game over : not stress tested
function gameLogic() {
    if(compStoredColors[counter][0] === playerStoredColors[counter]){
        console.log('correct')
        console.log(counter)
        counter += 1
        if(compStoredColors.length === counter){
            playerStoredColors = []
            counter = 0
            i = 0
            j = 0
            score += 1
            compChooses()
            lightButtons()
            console.log(counter)
            console.log(score)
        }
    }else{
        console.log('incorrect')

        playerStoredColors = []
        compStoredColors = []
        counter = 0
        i = 0
        j = 0
        counter = 0

        if(score > highScore){
            highScore = score
        }

        gameOver();
    }
}

function gameOver() {

        let m = 0
         
    function gameOverLights() {
        
        setTimeout(() => {

            antiClick.style.display = 'block'

            allButtons.forEach((btn) => {

                btn.style.backgroundColor = 'red' 
                btn.style.borderColor = 'red'
            
            })
        }, 300)

        setTimeout(() => {
            allButtons.forEach((btn) => {

                btn.style.backgroundColor = 'darkred' 
                btn.style.borderColor = 'darkred'
                
                if(m<5){
                    m++
                    gameOverLights()
                }

            })
        }, 500)

    }
    gameOverLights()

    setTimeout(() => {
        allButtons.forEach((btn) => {

            btn.style.backgroundColor = null
            btn.style.borderColor = null
            antiClick.style.display = 'none'

        })
            
    }, 1700)

}