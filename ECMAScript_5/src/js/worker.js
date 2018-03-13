onmessage = function(e) {
    let delay = setTimeout(function() {
        GetCount();
        let timer = setInterval(function() {
            GetCount();
        }, 60000);
    }, e.data)
};

async function GetCount() {
    const options = {
        method: 'get'
    }
    try {
        const response = await fetch('http://localhost:2403/books', options);
        const array = await response.json();
        postMessage(array.length);
    } catch (err) {
        console.log(err);
        postMessage(err);
    }
}