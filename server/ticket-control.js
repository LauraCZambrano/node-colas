const fs = require('fs');

//clase de tickets pendientes
class PendingTicket {
    constructor(num, desktop){
        this.num = num;
        this.desktop = desktop;
    }
}

//clase de tickets
class TicketControl {
    constructor(){
        //ultimo ticket, fecha de hoy, arreglo de tickets pendientes, ultimos 4 tickets pendientes
        this.last = 0;
        this.date = new Date().getDate();
        this.pending = [];
        this.last4 = [];

        let data = require('../data.json');
        
        //si la fecha de hoy coincide con la del del json
        if(data.date === this.date){
            //se actualizan los datos
            this.last = data.last;
            this.pending = data.pending;
            this.last4  = data.last4;
        }
        //si no, se reinician los datos
        else{
            this.restart();
        }
        
    }

    //actualizo los datos y el json
    next(){
        this.last = this.last + 1;
        let pendingTicket = new PendingTicket(this.last, null);
        this.pending.push(pendingTicket);
        this.writeFile();
        return `Ticket ${ this.last }`;
    }

    //obtengo el siguiente ticket
    getNext(){
        return `Ticket ${ this.last }`;
    }

    //obtengo los ultimos 4 tickets pendientes
    getLast4(){
        return this.last4;
    }

    //atender nuevos tickets
    attendTicket(desktop){
        //si no hay tickets pendientes
        if(this.pending.length === 0){
            return 'There are no pending tickets';
        }

        //tomo el primer ticket del arreglo de pendientes
        let numTicket = this.pending[0].num;
        //lo quito del arreglo
        this.pending.shift();

        //le asigno un escritorio al ticket
        let attend = new PendingTicket(numTicket, desktop);

        //lo asigno en el inicio al arreglo de los ultimos 4 tickets por atender
        this.last4.unshift(attend);

        //para mantener la cantidad de tickets en 4
        if(this.last4.length > 4){
            this.last4.splice(-1,1); //borrar la ultima casilla del arreglo
        }

        //guardo en el archivo
        this.writeFile();

        //retorno el ticket que se va a atender
        return attend;
    }

    restart(){
        //reinicio variables y el json
        this.last = 0;
        this.pending = [];
        this.last4 = [];
        this.writeFile();
    }

    //reescribo el json
    writeFile(){
        let jsonData = {
            last: this.last,
            date: this.date,
            pending: this.pending,
            last4: this.last4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl,
    PendingTicket
}