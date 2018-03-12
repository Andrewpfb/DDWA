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
        $('#bookForm').submit(function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            saveBook();
        });
        $('#selectTypeBook').change(function() {
            changeBookTypeByForm();
        });
        $('#searchBtn').click(function() {
            search();
        });
        $('#createBookFormBtn').click(function() {
            showCreateForm();
        });
        select = $('#selectTypeBook');
        var icon = new Image();
        icon.src = Icon;
        icon.height = 50;
        $('#logo').append(icon);
        var banner = new Image();
        banner.src = Icon;
        banner.width = 260;
        $('#banner').append(banner);
        drawTable();
    };

    function drawTable() {
        const callback = TableBuilder.CreateTable;
        const handler = setHandler;
        AjaxHelper.GetBooks(callback, handler);
    }

    function setHandler() {
        $('.infoTableBtn').click(function(event) {
            getInfo(event.currentTarget.value);
        });
        $('.delTableBtn').click(function(event) {
            deleteBook(event.currentTarget.value);
        });
        $('.editTableBtn').click(function(event) {
            console.log('editclick');
            editBook(event.currentTarget.value);
        });
        $('#BooksTable').click(function(event) {
            if (event.target.tagName != 'TH') return;
            AjaxHelper.SortBooks(event.target.cellIndex);
        });
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
            $('#bookId').val(book.id);
            $('#bookName').val(book.Name);
            $('#bookAuthor').val(book.Author);
            $('#bookGenre').val(book.Genre);
            $('#bookCD').val(book.IsHasCD);
            $('#bookDVD').val(book.IsHasDVD);
            $('#bookPublHouse').val(book.PublishingHouse);
            $('#bookDuration').val(book.Duration);
            $('#bookSize').val(book.Size);
            $('#bookPageCount').val(book.PageCount);
            $('#bookCoverType').val(book.CoverType);
            showCreateForm();
        } else {
            console.log(`Error, book doesn't found`);
        }
    };

    function saveBook() {
        let book = {
            Type: getSelectedType(),
            Name: $('#bookName').val(),
            Author: $('#bookAuthor').val(),
            Genre: $('#bookGenre').val(),
            IsHasCD: $('#bookCD').val(),
            IsHasDVD: $('#bookDVD').val(),
            PublishingHouse: $('#bookPublHouse').val(),
            Duration: $('#bookDuration').val(),
            Size: $('#bookSize').val(),
            PageCount: $('#bookPageCount').val(),
            CoverType: $('#bookCoverType').val(),
        };
        if (isEdit == true) {
            isEdit = false;
            book.id = $('#bookId').val(),
                AjaxHelper.UpdateBook(book);
        } else {
            AjaxHelper.CreateBook(book);
        }
        $('#bookForm').css('display', 'none');
        $('#createBookFormBtn').css('display', 'block');
    };

    function changeBookTypeByForm() {
        if (getSelectedType() == GLOBAL_CONST.AUDIO_TYPE) {
            $('#forAudio').css('display', 'block');
            $('#forSchool').css('display', 'none');
        } else if (getSelectedType() == GLOBAL_CONST.SCHOOL_TYPE) {
            $('#forAudio').css('display', 'none');
            $('#forSchool').css('display', 'block');
        };
    };

    function showCreateForm() {
        $('#bookForm').css('display', 'block');
        $('#createBookFormBtn').css('display', 'none');
    };

    function getSelectedType() {
        return select.val();
    };

    function setSelectValue(value) {
        select.val(value);
        changeBookTypeByForm();
    };

    function search() {
        let searchWord = $('#searchField').val();
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