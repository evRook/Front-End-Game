console.log('hello world')

let redBtn = document.querySelector('.red--btn') //gets red button
let blueBtn = document.querySelector('.blue--btn') //gets blue button
let greenBtn = document.querySelector('.green--btn') //gets green button
let yellowBtn = document.querySelector('.yellow--btn') //gets yellow button
let buttons = document.querySelector('.game--btns')
let storedColors = []

// redBtn.addEventListener('click', redTest => {
//     console.log('red')
// })

// blueBtn.addEventListener('click', blueTest => {
//     console.log('blue')
// })

// greenBtn.addEventListener('click', greenTest => {
//     console.log('green')
// })

// yellowBtn.addEventListener('click', yellowTest => {
//     console.log('yellow')
// })

buttons.addEventListener('click', userInput = (evt) => {
    storedColors.push(evt.target.getAttribute("data-color"))
    console.log(storedColors)
})
