import '../css/style.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/jquery-validation/dist/jquery.validate.min';
import '../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css';
import '../../node_modules/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css';

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
        $('#count').val(e.data);
        //document.getElementById('count').value = e.data;
        localStorage.setItem('lastUpdate', new Date());
    };
}