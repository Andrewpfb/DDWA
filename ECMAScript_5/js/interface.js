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
    var worker = new Worker('./js/worker.js');
    worker.postMessage('Hellow World');
    worker.onmessage = function(e) {
        document.getElementById('count').value = e.data;
        console.log(e.data);
    };
}