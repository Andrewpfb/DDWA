import Icon from '../img/bnr.jpg';

import AjaxHelper from './ajax.js';
import TableBuilder from './table.js';
import GLOBAL_CONST from './global.js';
import Models from './models.js';

const PageFunction = (function() {
    let isEdit = false;
    let select;

    function initPage() {
        debugger;
        $('#bookForm').validate({
            submitHandler: function() {
                alert('ok');
            },
            // rules: {
            //     bookName: {
            //         required: true,
            //         regexp: '^[а-яА-ЯёЁa-zA-Z0-9]+'
            //     }
            // }
        });
        AjaxHelper.InitAjax(GLOBAL_CONST.URL);
        TableBuilder.InitTable('BooksTable');
        select = $('#selectTypeBook');
        var icon = new Image();
        icon.src = Icon;
        icon.height = 50;
        $('#logo').append(icon);
        var banner = new Image();
        banner.src = Icon;
        banner.width = 260;
        $('#banner').append(banner);
        $.validator.addMethod(
            'regexp',
            function(value, element, regexp) {
                var re = new RegExp(regexp);
                return this.optional(element) || re.test(value);
            },
            "Please check your input."
        );
        $.validator.addClassRules({
            name: {
                required: true,
                regexp: '^[а-яА-ЯёЁa-zA-Z0-9]+'
            },
            onlyText: {
                required: true,
                regexp: '^[а-яА-ЯёЁa-zA-Z]+'
            }
        });
    };

    function setHandler() {
        // $('#bookForm').submit(function(event) {
        //     event.preventDefault();
        //     event.stopImmediatePropagation();
        //     saveBook();
        // });
        $('#selectTypeBook').change(function() {
            changeBookTypeByForm();
        });
        $('#searchBtn').click(function() {
            search();
        });
        $('#createBookFormBtn').click(function() {
            showCreateForm();
        });
        $('.infoTableBtn').click(function(event) {
            getInfo(event.currentTarget.value);
        });
        $('.delTableBtn').click(function(event) {
            deleteBook(event.currentTarget.value);
        });
        $('.editTableBtn').click(function(event) {
            editBook(event.currentTarget.value);
        });
    }

    function getInfo(id) {
        const promiseBook = AjaxHelper.GetBookInfoById(id);
        promiseBook.then(function(book) {
            if (book) {
                if (book.Type == GLOBAL_CONST.AUDIO_TYPE) {
                    TableBuilder.CreateDetailTable(Models.CreateAudioBook(book));
                } else if (book.Type == GLOBAL_CONST.SCHOOL_TYPE) {
                    TableBuilder.CreateDetailTable(Models.CreateSchoolBook(book));
                }
            } else {
                console.log(`Book doesn't find`);
            }
        });
    };

    function deleteBook(id) {
        AjaxHelper.DeleteBookById(id);
    };

    function editBook(id) {
        const promiseBook = AjaxHelper.GetBookInfoById(id);
        promiseBook
            .then(function(book) {
                if (book) {
                    isEdit = true;
                    setSelectValue(book.Type);
                    $('#bookId').val(book.id);
                    $('#bookName').val(book.Name);
                    $('#bookAuthor').val(book.Author);
                    $('#bookGenre').val(book.Genre);
                    $('#bookCD').prop('checked', book.IsHasCD);
                    $('#bookDVD').prop('checked', book.IsHasDVD);
                    $('#bookPublHouse').val(book.PublishingHouse);
                    $('#bookDuration').val(book.Duration);
                    $('#bookSize').val(book.Size);
                    $('#bookPageCount').val(book.PageCount);
                    $('#bookCoverType').val(book.CoverType);
                    showCreateForm();
                } else {
                    console.log(`Error, book doesn't found`);
                }
            });
    };

    function saveBook() {
        let book = {
            Type: getSelectedType(),
            Name: $('#bookName').val(),
            Author: $('#bookAuthor').val(),
            Genre: $('#bookGenre').val(),
            IsHasCD: $('#bookCD').prop('checked'),
            IsHasDVD: $('#bookDVD').prop('checked'),
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
        DrawTable() {
            setHandler();
        }
    }
})();

export default PageFunction;