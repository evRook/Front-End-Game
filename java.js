console.log('hello world')

let redBtn = document.querySelector('.red--btn')
let blueBtn = document.querySelector('.blue--btn')
let greenBtn = document.querySelector('.green--btn')
let yellowBtn = document.querySelector('.yellow--btn')
let storedColors = []

redBtn.addEventListener('click', redTest => {
    console.log('red')
})

blueBtn.addEventListener('click', blueTest => {
    console.log('blue')
})

greenBtn.addEventListener('click', greenTest => {
    console.log('green')
})

yellowBtn.addEventListener('click', yellowTest => {
    console.log('yellow')
})