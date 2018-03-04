// onmessage = function(e) {
//     transport = new XMLHttpRequest();
//     transport.open('GET', 'http://localhost:2403/books', true);
//     transport.onreadystatechange = function() {
//         if (transport.readyState == 4) {
//             postMessage(JSON.parse(transport.response).length);
//         }
//     };
//     transport.send();
//     //postMessage('hey');
//     // var timer = setInterval(function() {
//     //     postMessage('hey');
//     // }, 1000);
// };
onmessage = function(e) {
    var timer = setInterval(function() {
        transport = new XMLHttpRequest();
        transport.open('GET', 'http://localhost:2403/books', true);
        transport.onreadystatechange = function() {
            if (transport.readyState == 4) {
                postMessage(JSON.parse(transport.response).length);
            }
        };
        transport.send();
    }, 1000);
};