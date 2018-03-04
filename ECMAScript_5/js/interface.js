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

function LoadData() {
    var t = Models.CreateBook([1, 'name', 'genre', 'author', true, false, 'pb', 1]);
    PageFunction.InitPage();
};