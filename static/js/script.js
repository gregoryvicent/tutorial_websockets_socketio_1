const socket = io()
const message = document.getElementById('messages')
const input = document.getElementById('input')
const form = document.getElementById('form')

function createMessage(msg) {
    const messageItem = document.createElement('li')
    messageItem.textContent = msg
    message.appendChild(messageItem)
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    if(input.value) {
        socket.emit('create message', input.value)
    }
})

socket.on('i am connected', (msg) => {
    createMessage(msg)
})

socket.on('i am disconnected', (msg) => {
    createMessage(msg)
})

socket.on('create message', (msg) => {
    createMessage(msg)
})