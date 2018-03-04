"use strict";

var AjaxHelper = (function() {
    var url, oReq, bookArray;

    function initAjax(initUrl) {
        url = initUrl;
        oReq = new XMLHttpRequest();
        bookArray = [];
    }

    function getBooks(callback) {
        oReq.open('get', url, true);
        oReq.send();
        oReq.onreadystatechange = function() {
            if (oReq.readyState != 4) {
                return
            }
            if (oReq.status != 200) {
                console.log('Error: ' + oReq.status + ':' + oReq.statusText);
            } else {
                listener(oReq.response, callback);
            }
        }
    }

    function deleteBookById(id) {
        if (confirm('Are you sure?')) {
            oReq.onload = listenerDelete;
            var parameter = '?id=' + id;
            oReq.open("delete", url + parameter, true);
            oReq.send();
        }
    }

    function getInfoById(id) {
        for (var index = 0; index < bookArray.length; index++) {
            if (bookArray[index].id == id) {
                return bookArray[index];
            }
        }
    }

    function updateBook(book) {
        oReq.open('put', url + '/' + book.id, true);
        oReq.setRequestHeader('Content-type', 'application/json');
        oReq.send(JSON.stringify(book));
        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4) {
                if (oReq.status != 200) {
                    console.log('Error: ' + oReq.status + ':' + oReq.statusText);
                }
            }
        }
    }

    function createBook(book) {
        oReq.open('post', url, true);
        oReq.setRequestHeader('Content-type', 'application/json');
        oReq.send(JSON.stringify(book));
        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4) {
                if (oReq.status != 200) {
                    console.log('Error: ' + oReq.status + ':' + oReq.statusText);
                } else {
                    location.reload();
                }
            }
        }
    }

    function listener(response, callback) {
        bookArray = JSON.parse(oReq.responseText);
        // for (var i = 0; i < bookFromServer.length; i++) {
        //     bookArray.push(Models.CreateBook(bookFromServer[i]));
        // }
        callback(bookArray);
    }

    function listenerDelete() {
        console.log('delete');
        location.reload();
    }

    return {
        InitAjax: function(url) {
            initAjax(url);
        },
        GetBooks: function(callback) {
            getBooks(callback);
        },
        DeleteBookById: function(id) {
            deleteBookById(id);
        },
        GetBookInfoById: function(id) {
            return getInfoById(id);
        },
        UpdateBook: function(book) {
            updateBook(book);
        },
        CreateBook: function(book) {
            createBook(book);
        }
    }
})();