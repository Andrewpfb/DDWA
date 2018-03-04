"use strict";

var TableBuilder = (function() {
    var divId;
    var bookTableObj = document.createElement('table');
    var detailTableObj = document.createElement('table');

    function initTableBuilder(containerId) {
        divId = containerId;
    }

    function buildBooksTable(array) {
        bookTableObj.setAttribute('border', '1');

        bookTableObj.setAttribute('id', 'BooksTable');

        var tableHTML = '<caption>Books</caption><thead><tr>';

        tableHTML +=
            '<td>' + 'Name' + '</td>' +
            '<td>' + 'Author' + '</td>' +
            '<td>' + 'Genre' + '</td>' +
            '<td>' + 'IsHasCD' + '</td>' +
            '<td>' + 'IsHasDVD' + '</td>' +
            '<td>' + 'PublishingHouse' + '</td>' +
            '<td>' + '' + 'Delete' + '</td>' +
            '<td>' + '' + 'Info' + '</td>' +
            '<td>' + '' + 'Edit' + '</td>' +
            '</tr></thead>';
        for (var i = 0; i < array.length; i++) {
            tableHTML += '<tr>' +
                '<td>' + array[i].Name + '</td>' +
                '<td>' + array[i].Author + '</td>' +
                '<td>' + array[i].Genre + '</td>' +
                '<td>' + array[i].IsHasCD + '</td>' +
                '<td>' + array[i].IsHasDVD + '</td>' +
                '<td>' + array[i].PublishingHouse + '</td>' +
                '<td><button onclick="Delete(' + '\'' + array[i].id + '\'' + ')">Delete</button></td>' +
                '<td><button onclick="Info(' + '\'' + array[i].id + '\'' + ')">Info</button></td>' +
                '<td><button onclick="Edit(' + '\'' + array[i].id + '\'' + ')">Edit</button></td>' +
                '</tr>';
        }
        bookTableObj.innerHTML = tableHTML;
        document.getElementById(divId).appendChild(bookTableObj);
    }

    function buildDetailTable(book) {
        console.log(book.GetInfo());
        detailTableObj.setAttribute('border', '1');
        detailTableObj.setAttribute('id', 'DetailTable');
        var tableHTML = '<caption>Detail</caption>';
        tableHTML += '<thead>' +
            '<tr><td>' + 'Name' + '</td><td>' + book.Name + '</td></tr>' +
            '<tr><td>' + 'Genre' + '</td><td>' + book.Genre + '</td></tr>' +
            '<tr><td>' + 'Author' + '</td><td>' + book.Author + '</td></tr>' +
            '<tr><td>' + 'CD' + '</td><td>' + book.IsHasCD + '</td></tr>' +
            '<tr><td>' + 'DVD' + '</td><td>' + book.IsHasDVD + '</td></tr>' +
            '<tr><td>' + 'Publishing House' + '</td><td>' + book.PublishingHouse + '</td></tr>';
        if (book.Type == GLOBAL_CONST.AUDIO_TYPE) {
            tableHTML +=
                '<tr><td>' + 'Duration' + '</td><td>' + book.Duration + '</td></tr>' +
                '<tr><td>' + 'Size' + '</td><td>' + book.Size + '</td></tr>';
        } else if (book.Type == GLOBAL_CONST.SCHOOL_TYPE) {
            tableHTML +=
                '<tr><td>' + 'Page count' + '</td><td>' + book.PageCount + '</td></tr>' +
                '<tr><td>' + 'Cover type' + '</td><td>' + book.CoverType + '</td></tr>';
        }
        detailTableObj.innerHTML = tableHTML;
        document.getElementById(divId).appendChild(detailTableObj);
    }

    return {
        InitTableBuilder: function(containerId) {
            initTableBuilder(containerId);
        },
        CreateTable: function(bookArray) {
            buildBooksTable(bookArray);
        },
        CreateDetailTable: function(book) {
            buildDetailTable(book);
        }
    }
})();