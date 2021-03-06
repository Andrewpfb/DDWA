"use strict";

var PageFunction = (function() {
    var isEdit = false;

    function initPage() {
        AjaxHelper.InitAjax(GLOBAL_CONST.URL);
        document.getElementById('bookForm').onsubmit = function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            console.log('11');
            saveBook();
        }
        drawTable();
    }

    function drawTable() {
        var callback = TableBuilder.CreateTable;
        AjaxHelper.GetBooks(callback);
    }

    function getInfo(id) {
        var book = AjaxHelper.GetBookInfoById(id);
        if (book) {
            if (book.Type == GLOBAL_CONST.AUDIO_TYPE) {
                TableBuilder.CreateDetailTable(Models.CreateAudioBook(book));
            } else if (book.Type == GLOBAL_CONST.SCHOOL_TYPE) {
                TableBuilder.CreateDetailTable(Models.CreateSchoolBook(book));
            }
        } else {
            console.log("Book doesn't find");
        }
    };

    function deleteBook(id) {
        AjaxHelper.DeleteBookById(id);
    };

    function editBook(id) {
        var book = AjaxHelper.GetBookInfoById(id);
        if (book) {
            isEdit = true;
            setSelectValue(book.Type);
            document.getElementById('bookId').value = book.id;
            document.getElementById('bookName').value = book.Name;
            document.getElementById('bookAuthor').value = book.Author;
            document.getElementById('bookGenre').value = book.Genre;
            document.getElementById('bookCD').checked = book.IsHasCD;
            document.getElementById('bookDVD').checked = book.IsHasDVD;
            document.getElementById('bookPublHouse').value = book.PublishingHouse;
            document.getElementById('bookDuration').value = book.Duration;
            document.getElementById('bookSize').value = book.Size;
            document.getElementById('bookPageCount').value = book.PageCount;
            document.getElementById('bookCoverType').value = book.CoverType;
            showCreateForm();
        } else {
            console.log('Error, book not found');
        }
    };

    function saveBook() {
        var book = {
            Type: getSelectedType(),
            Name: document.getElementById('bookName').value,
            Author: document.getElementById('bookAuthor').value,
            Genre: document.getElementById('bookGenre').value,
            IsHasCD: document.getElementById('bookCD').checked,
            IsHasDVD: document.getElementById('bookDVD').checked,
            PublishingHouse: document.getElementById('bookPublHouse').value,
            Duration: document.getElementById('bookDuration').value,
            Size: document.getElementById('bookSize').value,
            PageCount: document.getElementById('bookPageCount').value,
            CoverType: document.getElementById('bookCoverType').value,
        };
        if (isEdit == true) {
            isEdit = false;
            book.id = document.getElementById('bookId').value;
            AjaxHelper.UpdateBook(book);
        } else {
            AjaxHelper.CreateBook(book);
        }
        document.getElementById('bookForm').style.display = "none";
        document.getElementById('createBookFormBtn').style.display = 'block';
    };

    function changeBookTypeByForm() {
        if (getSelectedType() == GLOBAL_CONST.AUDIO_TYPE) {
            document.getElementById('forAudio').style.display = 'block';
            document.getElementById('forSchool').style.display = 'none';
        } else if (getSelectedType() == GLOBAL_CONST.SCHOOL_TYPE) {
            document.getElementById('forAudio').style.display = 'none';
            document.getElementById('forSchool').style.display = 'block';
        };
    };

    function showCreateForm() {
        document.getElementById('bookForm').style.display = 'block';
        document.getElementById('createBookFormBtn').style.display = 'none';
    };

    function getSelectedType() {
        var select = document.getElementById('selectTypeBook');
        var selectOption = select.options[select.selectedIndex];
        return selectOption.value;
    }

    function setSelectValue(value) {
        var select = document.getElementById('selectTypeBook');
        var selectOption = select.options[value - 1].selected = true;
        changeBookTypeByForm();
    }

    return {
        InitPage: function() {
            initPage();
        },
        GetInfo: function(id) {
            getInfo(id);
        },
        DeleteBook: function(id) {
            deleteBook(id);
        },
        EditBook: function(id) {
            editBook(id);
        },
        SaveBook: function() {
            saveBook();
        },
        ShowCreateForm: function() {
            showCreateForm();
        },
        ChangeBookTypeByForm: function() {
            changeBookTypeByForm();
        },
        DrawTable: function() {
            drawTable();
        }
    }
})();