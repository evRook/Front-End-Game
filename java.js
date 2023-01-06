
let buttons = document.querySelector('.game--btn__container')
let soloButton = document.querySelectorAll('.game--btn')
let startButton = document.querySelector('.startGame')
let compStoredColors = []
let playerStoredColors = []
let tempStorage = []
let activeColor;
let inactiveColor;
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
    yellow: {
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
    compChooses()
    lightButtons()
})


//turns btnColors into and array then pushes random value to new array
function compChooses(){
    let randomColor = Object.entries(btnColors)
    compStoredColors.push(randomColor[Math.floor(Math.random() * randomColor.length)])
    // console.log(compStoredColors[0][1])
}
compChooses()
compChooses()
compChooses()
compChooses()
compChooses()
compChooses()

// does not work with start button ~kinda(if you click while its in sequence it breaks)
function lightButtons() {
    function lightLoop() {
            
        setTimeout(() => {

            let getButton = document.getElementById(`${compStoredColors[i][0]}Btn`)
            activeColor = `${compStoredColors[i][1].active}`
            
            getButton.style.backgroundColor = `${activeColor}`
            
            i++
            timer = i
        
        }, 1000 - (timer * 20))

        setTimeout(() => {

            let getSameButton = document.getElementById(`${compStoredColors[j][0]}Btn`)
            inactiveColor = `${compStoredColors[j][1].inactive}`
            
            getSameButton.style.backgroundColor = `${inactiveColor}`
            
            j++
            
            if(j < compStoredColors.length){
                lightLoop()
            }

        }, 1500 - (timer * 20))

    }
    lightLoop()
    
}
lightButtons()


// clicking too fast changes backgrounds to wrong color
buttons.addEventListener('click', userInput = (evt) => {

    activeColor = evt.target.getAttribute('data-color')
    inactiveColor = evt.target.getAttribute('data-original')

    playerStoredColors.push(activeColor)

    console.log(playerStoredColors)

    evt.target.style.backgroundColor = `${activeColor}`

    setTimeout(()=> {
        evt.target.style.backgroundColor = `${inactiveColor}`
    }, 500)
})








//tabling this for now

// buttons.addEventListener('click', userInput = (evt) => {
//     playerStoredColors.push(evt.target.getAttribute("data-color"))
//     console.log(playerStoredColors)
// })

// // function cpuChooses() {
// //     for(i=0; i<compChoices.length; i++){
// //         console.log(compChoices[i])
// //     }
// // }
// // cpuChooses()

// function cpuChooses(){
//     let randomColor = Math.floor(Math.random() * compChoices.length)
//     compStoredColors.push(compChoices[randomColor])
// }

// function compTurn() {

//     cpuChooses();
//     console.log(compStoredColors)

// }


// function playerTurn() {

//     //clear playerStoredColor

// }



//tabling this for now

// compStoredColors.forEach(()=>{
//     for(i=0; i<soloButton.length; i++){
        
//     }
// })


// function compTurn(){

//     cpuChooses();



    // for(i=0; i < compStoredColors.length; i++){
    //     for(j=0; j<soloButton.length; j++) {
    //         let litButton = soloButton[j].getAttribute("data-color")
    //         let litColor = compStoredColors[i]
    //         let originalColor = soloButton[j].getAttribute("data-original")
    //         let originalButton = soloButton[j]
    //         console.log(litColor)
    //         if(litButton === litColor){
    //             soloButton[j].style.backgroundColor = `${litColor}`
    //             setTimeout(()=> {
    //                 originalButton.style.backgroundColor = `${originalColor}`
    //             }, 1100 - (i * 20));
    //         }
    //     }
    // } 

    
// compStoredColors.forEach(() => {
//     console.log(compStoredColors)
// })

// soloButton.forEach(() => {
//     console.log(soloButton)
// })



    // let litColor;
    // let originalButton;

    // for(i=0; i<compStoredColors.length; i++){
    //     litColor = compStoredColors[i]
    //     console.log(litColor)
    // }

    // for(j=0; j<soloButton.length; j++){
    //     originalButton = soloButton[j]
    //     console.log(originalButton)
    // }

    // const match = compStoredColors.filter(element => compChoices.includes(element))
    // console.log(match)
    

// }
// compTurn()



// let test(a,b){
//     for (let i = 0; i<a.length;i++){
//         for(let k = 0; k<b.length: k++){
//             if(a[i] === b[k]){

//             }
//         }
//     }
// }

// test(compStoredColors,soloButton)