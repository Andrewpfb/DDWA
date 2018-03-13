import '../css/style.css';

import PageFunction from './pageFunction.js';
//import { bookWorker } from './worker';


window.onload = function() {
    PageFunction.InitPage();
}

// let blob = new Blob(['(this.onmessage=', bookWorker.toString(), ')'], { type: "text/javascript" });
// let worker = new Worker(window.URL.createObjectURL(blob));
// let delay = new Date() - new Date(localStorage.getItem('lastUpdate'));
// if (delay < 60000) {
//     worker.postMessage(60000 - delay);
// } else {
//     worker.postMessage(0);
// };
// worker.onmessage = function(e) {
//     document.getElementById('count').value = e.data;
//     localStorage.setItem('lastUpdate', new Date());
// };