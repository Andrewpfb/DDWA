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