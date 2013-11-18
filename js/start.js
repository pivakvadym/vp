/**
 * Created by VadymPivak on 12/11/13.
 */
var socket = io.connect();   // we might pass the URL of the WS server as parameter here

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
    $('#conversation').append('<p>'+ username + ' : ' + data + '</p>' );
});

// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function(data) {
    $('#users_name').empty();
       $.each(data, function(key, value) {
        $('#users_name').append('<p style="color:'+ get_random_color() + '">' + key + '</p></br>');
    });
});

window.onbeforeunload = function() {
  socket.emit('disconnect');
}


console.log('-------- start---------------->'+get_random_color());
// on load of page

$(function(){
    // when the client clicks SEND
    $('#datasend').click( function() {
        var message = $('#data').val();
        $('#data').val('');
        // tell server to execute 'sendchat' and send along one parameter
        socket.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('#data').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
        }
    });
});
