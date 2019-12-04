let socket = io();

let lblTicket = [$('#lblTicket1'),$('#lblTicket2'),$('#lblTicket3'),$('#lblTicket4')];
let lblEscritorio = [$('#lblEscritorio1'),$('#lblEscritorio2'),$('#lblEscritorio3'),$('#lblEscritorio4')];

socket.on('ticket', function(res){
    console.log(res);

    updateHTML(res.last4);
});

function updateHTML( last4 ){
    for(var i=0; i<last4.length; i++){
        lblTicket[i].text('Ticket ' + last4[i].num);
        lblEscritorio[i].text('Escritorio ' + last4[i].desktop);
    }
}