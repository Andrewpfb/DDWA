import '../css/style.css';

import PageFunction from './pageFunction.js';


window.onload = function() {
    PageFunction.InitPage();
}

if (!!window.Worker) {
    let worker = new Worker('./worker.js');
    let delay = new Date() - new Date(localStorage.getItem('lastUpdate'));
    if (delay < 60000) {
        worker.postMessage(60000 - delay);
    } else {
        worker.postMessage(0);
    };
    worker.onmessage = function(e) {
        document.getElementById('count').value = e.data;
        localStorage.setItem('lastUpdate', new Date());
    };
}