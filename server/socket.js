const { io } = require('./server');
const { TicketControl } = require('./ticket-control');

const ticket = new TicketControl();

io.on('connection', (client) => {

    //conexion con el cliente
    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //recibir mensaje del cliente
    client.on('nextTicket', ()=> {
        let next = ticket.next();

        //emitir respuesta al cliente
        client.emit('notify', next);

    });

    //emitir ticket actual
    client.emit('ticket', {
        ticket: ticket.getNext(),
        last4: ticket.getLast4()
    });

    //atender tickets
    client.on('attend', (data, callback) => {
        
        if(!data.desktop){
            return callback({
                ok: false
            });
        }

        let attendTicket = ticket.attendTicket(data.desktop);

        callback(attendTicket);

    //emitir ticket actual
    client.broadcast.emit('ticket', {
        ticket: ticket.getNext(),
        last4: ticket.getLast4()
    });
    });
});