let socket = io();

let label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado');
});

socket.on('disconnect', function() {
    console.log('Desconectado');
});

socket.on('ticket', function(res){
    label.text(res.ticket);
});

$('button').on('click', function(){

    //enviar datos del servidor
    socket.emit('nextTicket');

    //recibir respuesta del servidor
    socket.on('notify', function(res) {
        label.text(res);
    });
});