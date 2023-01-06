console.log('hello world')

let redBtn = document.querySelector('.red--btn') //gets red button
let blueBtn = document.querySelector('.blue--btn') //gets blue button
let greenBtn = document.querySelector('.green--btn') //gets green button
let yellowBtn = document.querySelector('.yellow--btn') //gets yellow button
let buttons = document.querySelector('.game--btn__container')
let soloButton = document.querySelectorAll('.game--btn')
let compChoices = ['red','blue','green','yellow']
let compStoredColors = []
let playerStoredColors = []

buttons.addEventListener('click', userInput = (evt) => {
    playerStoredColors.push(evt.target.getAttribute("data-color"))
})

// function cpuChooses() {
//     for(i=0; i<compChoices.length; i++){
//         console.log(compChoices[i])
//     }
// }
// cpuChooses()

function cpuChooses(){
    let randomColor = Math.floor(Math.random() * compChoices.length)
    compStoredColors.push(compChoices[randomColor])
}

function compTurn(){

    cpuChooses();

    for(i=0; i < compStoredColors.length; i++){
        for(j=0; j<soloButton.length; j++) {
            let litButton = soloButton[j].getAttribute("data-color")
            let litColor = compStoredColors[i]
            if(litButton === litColor){
                soloButton[j].style.backgroundColor = `${litColor}`
            }   
        }
    }


}
compTurn()