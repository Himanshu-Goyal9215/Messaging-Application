const socket = io('http://localhost:8000');

var audio = new Audio('./ding.mp3'); 

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');

const messageContainer = document.querySelector(".container");

const username = prompt("Please enter your name");

socket.emit('new-user-joined', username);


// User joined Listen

const append = (message,position) => {
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
        audio.play();
}

socket.on('user-joined', username =>{
        append(`${username} joined the chat`,'right');
})

socket.on('receive', data =>{
        append(` ${data.username} : ${data.message}`,'left');
})

socket.on('user-left', username =>{
        append(`${username} left the chat`,'left');
})

// submit kre form

form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        append(`You: ${message}`,'right');
        socket.emit('send', message);
        messageInput.value = '';
})

