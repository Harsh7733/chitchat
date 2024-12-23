const socket = io('https://chit-chat-backend-gray.vercel.app');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio=new Audio('ting.mp3');

// Function to append messages to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position==='left'){
        audio.play();
    }
};

const name = prompt("Enter Your Name to Join the Chat");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    append(`${name}: left the chat`, 'left');
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const message = messageInput.value;
    append(`you: ${message}`,'right')
    socket.emit('send', message); 
    messageInput.value = ''; 
});