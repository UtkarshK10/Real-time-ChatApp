const socket = io();
const form =document.getElementById('send-container')
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
const feed=document.getElementById('feed')
var audio=new Audio('ting.mp3')

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
        audio.play()
    }    
}

messageInput.onkeyup=()=>{
    socket.emit('user-typing',name)    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right')
    socket.emit('send',message)
    socket.emit('user-stopped-typing')
    messageInput.value=null
});

const  name=prompt('enter your name')
socket.emit('new-user-joined',name)
socket.on('user-joined',name=>{
    append(`${name} just joined`,'right')
})
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left')
})
socket.on('left',name=>{
    append(`${name} just left the meeting`,'left')
})
socket.on('typing',name=>{
    feed.innerHTML=`${name} is typing`
})
socket.on('stop',()=>{
    feed.innerHTML=''
})

