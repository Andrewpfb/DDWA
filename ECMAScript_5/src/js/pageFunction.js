import Icon from '../img/bnr.jpg';

import AjaxHelper from './ajax.js';
import TableBuilder from './table.js';
import GLOBAL_CONST from './global.js';
import Models from './models.js';

const PageFunction = (function() {
    let isEdit = false;
    let select;

    function initPage() {
        AjaxHelper.InitAjax(GLOBAL_CONST.URL);
        TableBuilder.InitTableBuilder('tableForm');
        document.getElementById('bookForm').onsubmit = function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            saveBook();
        };
        document.getElementById('selectTypeBook').onchange = function() {
            changeBookTypeByForm();
        };
        document.getElementById('searchBtn').onclick = function() {
            search();
        };
        document.getElementById('createBookFormBtn').onclick = function() {
            showCreateForm();
        };
        select = document.getElementById('selectTypeBook');
        var icon = new Image();
        icon.src = Icon;
        icon.height = 50;
        icon.width = 100;
        document.getElementById('logo').appendChild(icon);
        var banner = new Image();
        banner.src = Icon;
        banner.width = 260;
        banner.height = 100;
        document.getElementById('banner').appendChild(banner);
        drawTable();
    };

    function drawTable() {
        const callback = TableBuilder.CreateTable;
        const handler = setHandler;
        AjaxHelper.GetBooks(callback, handler);
    }

    function setHandler() {
        const del = document.getElementsByClassName('delTableBtn');
        const info = document.getElementsByClassName('infoTableBtn');
        const edit = document.getElementsByClassName('editTableBtn');
        const table = document.getElementById('BooksTable');
        for (let i = 0; i < del.length; i++) {
            del[i].addEventListener('click', function() {
                deleteBook(del[i].value);
            });
            info[i].addEventListener('click', function() {
                getInfo(info[i].value);
            });
            edit[i].addEventListener('click', function() {
                editBook(edit[i].value);
            });
        }
        table.onclick = function(e) {
            if (e.target.tagName != 'TH') return;
            AjaxHelper.SortBooks(e.target.cellIndex);
        }
    }

    function getInfo(id) {
        const book = AjaxHelper.GetBookInfoById(id);
        if (book) {
            if (book.Type == GLOBAL_CONST.AUDIO_TYPE) {
                TableBuilder.CreateDetailTable(Models.CreateAudioBook(book));
            } else if (book.Type == GLOBAL_CONST.SCHOOL_TYPE) {
                TableBuilder.CreateDetailTable(Models.CreateSchoolBook(book));
            }
        } else {
            console.log(`Book doesn't find`);
        }
    };

    function deleteBook(id) {
        AjaxHelper.DeleteBookById(id);
    };

    function editBook(id) {
        const book = AjaxHelper.GetBookInfoById(id);
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
            console.log(`Error, book doesn't found`);
        }
    };

    function saveBook() {
        let book = {
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
        const selectOption = select.options[select.selectedIndex];
        return selectOption.value;
    };

    function setSelectValue(value) {
        const selectOption = select.options[value - 1].selected = true;
        changeBookTypeByForm();
    };

    function search() {
        let searchWord = document.getElementById('searchField').value;
        AjaxHelper.SearchBooks(searchWord);
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
        Search: function() {
            search();
        },
        DrawTable() {
            drawTable();
        }
    }
})();

export default PageFunction;