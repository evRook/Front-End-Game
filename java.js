
let buttons = document.querySelector('.game--btn__container')
let soloButton = document.querySelectorAll('.game--btn')
let compChoices = ['red','blue','green','goldenrod']
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
            let originalColor = soloButton[j].getAttribute("data-original")
            let originalButton = soloButton[j]
            if(litButton === litColor){
                soloButton[j].style.backgroundColor = `${litColor}`
                function flashButton(){
                    originalButton.style.backgroundColor = `${originalColor}`
                }
                setTimeout(flashButton, 1100 - (i*20));
            }   
        }
    }


}
compTurn()