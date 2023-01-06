
let buttons = document.querySelector('.game--btn__container')
let soloButton = document.querySelectorAll('.game--btn')
let startButton = document.querySelector('.startGame')
let compStoredColors = []
let playerStoredColors = []
let tempStorage = []

let btnColors = {
    red: {
        active: 'red',
        inactive: 'y',
    },
    blue: {
        active: 'blue',
        inactive: 'y',
    },
    green: {
        active: 'green',
        inactive: 'y',
    },
    yellow: {
        active: 'goldenrod',
        inactive: 'y',
    },
}



//START GAME: clears data and has computer coose
startButton.addEventListener('click', () => {
    console.log('start button')
    compStoredColors = [];
    playerStoredColor = [];
    console.log(btnColors.red.active)
    console.log(btnColors.red.inactive)
    compChooses()
    console.log(compStoredColors[0][1].active)
})


//turns btnColors into and array then pushes random value to new array
function compChooses(){
    let randomColor = Object.entries(btnColors)
    compStoredColors.push(randomColor[Math.floor(Math.random() * randomColor.length)])
    console.log(compStoredColors[0][1])
}
compChooses()

function liteButtons() {
    for(i=0; i<compStoredColors.length; i++){
        console.log(compStoredColors[i][0])
        let litColor = document.getElementById(`${compStoredColors[i][0]}Btn`)
        let getColor = `${compStoredColors[i][1].active}`
        setTimeout(() => {
            console.log(getColor) 
        }, 1100 - (i * 20))
    }
}
liteButtons()

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