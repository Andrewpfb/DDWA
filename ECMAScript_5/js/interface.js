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
    // if (Number(localStorage.getItem('lastUpdate')) < new Date().getMinutes()) {
    //     worker.postMessage(0);
    // };
    postMessage(1000);
    worker.onmessage = function(e) {
        document.getElementById('count').value = e.data;
        localStorage.setItem('lastUpdate', new Date().getMinutes());
    };
}

// воркер стартует. Уходим со страницы, возвращаемся. Если прошла минута, воркер стартует, если нет - нет 
// и висит до упора.(