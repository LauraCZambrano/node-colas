let socket = io();

let searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
}

let desktop = searchParams.get('escritorio');
let label = $('small');


$('h1').text('Escritorio ' + desktop);

$('button').on('click', function() {
    socket.emit('attend', {desktop: desktop}, function(res) {
        
        if(res === 'There are no pending tickets'){
            $('h4').text(res);
            alert(res);
            return;
        }
        

        label.text('ticket ' + res.num);
    });
});