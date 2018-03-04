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
            '<td>' + 'Genre' + '</td>' +
            '<td>' + 'Author' + '</td>' +
            '<td>' + 'IsHasCD' + '</td>' +
            '<td>' + 'IsHasDVD' + '</td>' +
            '<td>' + 'PublishingHouse' + '</td>' +
            '<td>' + '' + 'Delete' + '</td>' +
            '<td>' + '' + 'Info' + '</td>' +
            '<td>' + '' + 'Edit' + '</td>' +
            '</tr></thead>';
        console.log('table');
        console.log(array);
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
        //document.body.appendChild(bookTableObj);
    }

    function buildDetailTable(book) {
        detailTableObj.setAttribute('border', '1');
        detailTableObj.setAttribute('id', 'DetailTable');
        var tableHTML = '<caption>Detail</caption><thead><tr>';
        for (var key = 2; key < 10; key++) {
            if (Object.keys(book)[key] == 'Type') {} else {
                tableHTML += '<td>' + Object.keys(book)[key] + '</td><td>' + book[Object.keys(book)[key]]() + '</td></tr>';
            }
        }
        detailTableObj.innerHTML = tableHTML;
        document.getElementById(divId).appendChild(detailTableObj);
        //document.body.appendChild(detailTableObj);
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