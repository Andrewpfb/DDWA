onmessage = function(e) {
    var delay = setTimeout(function() {
        GetCount();
        var timer = setInterval(function() {
            GetCount();
        }, 60000);
    }, e.data)
};

function GetCount() {
    transport = new XMLHttpRequest();
    transport.open('GET', 'http://localhost:2403/books', true);
    transport.onreadystatechange = function() {
        if (transport.readyState == 4) {
            postMessage(JSON.parse(transport.response).length);
        }
    };
    transport.send();
}