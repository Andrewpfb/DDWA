"use strict";

const AjaxHelper = (function() {
    let url, bookArray;

    function initAjax(initUrl) {
        url = initUrl;
        bookArray = [];
    }

    async function getBooks(callback) {
        const options = {
            method: 'get'
        };
        try {
            const response = await fetch(url, options);
            const bookArrayResponse = await response.json();
            bookArray = bookArrayResponse;
            callback(bookArray);
        } catch (err) {
            console.log(err);
        }
    };

    function searchBooks(searchWord, callback = TableBuilder.CreateTable) {
        callback(bookArray.filter(
            s =>
            s.Name == searchWord ||
            s.Genre == searchWord ||
            s.Author == searchWord));
    }

    async function deleteBookById(id) {
        if (confirm('Are you sure?')) {
            const options = {
                method: 'delete'
            };
            const path = url + `?id=${id}`;
            try {
                const response = await fetch(path, options);
                console.log(`Delete's status: ${response.status} ${response.statusText}`);
                PageFunction.DrawTable();
            } catch (err) {
                console.log(err);
            }
        }
    }

    function getInfoById(id) {
        return bookArray.find(x => x.id == id);
    }

    async function updateBook(book) {
        const options = {
            method: 'put',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(book)
        }
        const path = url + '/' + book.id;
        try {
            const response = await fetch(path, options);
            console.log(`Update's status: ${response.status} ${response.statusText}`);
            PageFunction.DrawTable();
        } catch (err) {
            console.log(err);
        }
    }

    async function createBook(book) {
        const options = {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(book)
        }
        try {
            const response = await fetch(url, options);
            console.log(`Create's status: ${response.status} ${response.statusText}`);
            PageFunction.DrawTable();
        } catch (err) {
            console.log(err);
        }
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
        },
        SearchBooks: function(searchWord, callback) {
            searchBooks(searchWord, callback);
        }
    }
})();