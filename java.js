
let buttons = document.querySelector('.game--btn__container')
let soloButton = document.querySelectorAll('.game--btn')
let startButton = document.querySelector('.startGame')
let compStoredColors = []
let playerStoredColors = []
let tempStorage = []

let btnColors = {
    red: {
        active: 'x',
        inactive: 'y',
    },
    blue: {
        active: 'x',
        inactive: 'y',
    },
    green: {
        active: 'x',
        inactive: 'y',
    },
    yellow: {
        active: 'x',
        inactive: 'y',
    },
}


startButton.addEventListener('click', () => {
    console.log('start button')
    compStoredColors = [];
    playerStoredColor = [];
    console.log(btnColors.red.active)
    console.log(btnColors.red.inactive)
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