import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-validation/dist/jquery.validate.min';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css';

import PageFunction from './pageFunction.js';
import { bookWorker } from './worker';

require('font-awesome/css/font-awesome.css');
require('datatables.net');
require('datatables.net-bs4');
require('tempusdominus-bootstrap-4');
var Promise = require('bluebird');


window.onload = function() {
    PageFunction.InitPage();
}

let blob = new Blob(['(this.onmessage=', bookWorker.toString(), ')'], { type: "text/javascript" });
let worker = new Worker(window.URL.createObjectURL(blob));
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