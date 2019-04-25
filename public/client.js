/*global io*/
let socket = io();

$( document ).ready(function() {
  socket.on('user', (data) => {
    $('#num-users').text(data.currentUsers + ' users online');
    let message = data.name;
    if(data.connected) {
      message += ' has joined the chat.';
    } else {
      message += ' has left the chat.';
    }
    $('#messages').append($('<li>').html('<b>'+ message +'<\/b>'));
  });
  // Form submittion with new message in field with id 'm'
  $('form').submit(function(){
    let messageToSend = $('#m').val();
    //send message to server here?
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
  // listen for 'chat message' and update the ul
  socket.on('chat message', (data) => {
    $('#messages').append($('<li>').html(data.name + ": " + data.message));
  });
  
});
