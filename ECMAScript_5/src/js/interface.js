import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-validation/dist/jquery.validate.min';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css';

import PageFunction from './pageFunction.js';

require('font-awesome/css/font-awesome.css');
require('datatables.net');
require('datatables.net-bs4');
require('tempusdominus-bootstrap-4');
var Promise = require('bluebird');


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
        $('#count').val(e.data);
        localStorage.setItem('lastUpdate', new Date());
    };
}