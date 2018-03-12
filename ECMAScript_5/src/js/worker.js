export function bookWorker(e) {
    let delay = setTimeout(function() {
        GetCount();
        let timer = setInterval(function() {
            GetCount();
        }, 60000);
    }, e.data);
};

export async function GetCount() {
    const options = {
        method: 'get'
    }
    try {
        const response = await fetch('http://localhost:2403/books', options);
        const array = await response.json();
        postMessage(array.length);
    } catch (err) {
        debugger;
        postMessage(err);
    }
}