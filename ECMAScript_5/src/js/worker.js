export function bookWorker(e) {
    let delay = setTimeout(function() {
        GetCount();
        let timer = setInterval(function() {
            GetCount();
        }, 60000);
    }, e.data);

    function GetCount() {
        oReq = new XMLHttpRequest();
        oReq.open('get', 'http://localhost:2403/books', true);
        oReq.send();
        oReq.onreadystatechange = function() {
            if (oReq.readyState != 4) {
                return
            }
            if (oReq.status != 200) {
                console.log('Error: ' + oReq.status + ':' + oReq.statusText);
            } else {
                postMessage(JSON.parse(oReq.response).length);
            }
        }
    }
};