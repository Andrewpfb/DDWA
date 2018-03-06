"use strict";

function Info(id) {
    PageFunction.GetInfo(id);
}

function Delete(id) {
    PageFunction.DeleteBook(id);
}

function Edit(id) {
    PageFunction.EditBook(id);
}

function ShowCreateForm() {
    PageFunction.ShowCreateForm();
}

function Save() {
    PageFunction.SaveBook();
}

function ChangeCreateBookType() {
    PageFunction.ChangeBookTypeByForm();
}

function Search() {
    PageFunction.Search();
}

function LoadData() {
    PageFunction.InitPage();
};

if (!!window.Worker) {
    let worker = new Worker('./js/worker.js');
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