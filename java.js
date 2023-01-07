
let buttons = document.querySelector('.game--btn__container')
let allButtons = document.querySelectorAll('.game--btn')
let startButton = document.querySelector('.startGame')
let antiClick = document.querySelector('.antiClick')
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
            
            i++
            timer = i

            console.log(compStoredColors)
        
        }, 1000 - (timer * 20))

        setTimeout(() => {

            let getSameButton = document.getElementById(`${compStoredColors[j][0]}Btn`)
            inactiveColor = `${compStoredColors[j][1].inactive}`
            
            getSameButton.style.backgroundColor = `${inactiveColor}`
            
            j++
            
            if(j < compStoredColors.length){
                lightLoop()
            }else{
                antiClick.style.display = 'none'
            }

        }, 1500 - (timer * 20))

    }
    lightLoop()
    
}


// clicking too fast changes backgrounds to wrong color
buttons.addEventListener('click', userInput = (evt) => {

    activeColor = evt.target.getAttribute('data-color')
    inactiveColor = evt.target.getAttribute('data-original')

    playerStoredColors.push(activeColor)

    console.log(playerStoredColors)
    console.log(compStoredColors)

    evt.target.style.backgroundColor = `${activeColor}`

    antiClick.style.display = 'block'

    setTimeout(() => {
        evt.target.style.backgroundColor = `${inactiveColor}`
        antiClick.style.display = 'none'
    }, 150)
     

    gameLogic();

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
        console.log('wrong')

        playerStoredColors = []
        counter = 0
        i = 0
        j = 0
        counter = 0

        if(score > highScore){
            highScore = score
        }

        console.log(highScore)

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
            
    }, 2500)

}