"use strict";

const AjaxHelper = (function() {
    let url, bookArray;

    function initAjax(initUrl) {
        url = initUrl;
        bookArray = [];
    }

    async function getBooks(callback) {
        let options = {
            method: 'get'
        };
        await fetch(url, options)
            .then(function(response) {
                console.log('first then');
                console.log(response.headers.get('Content-Type'));
                console.log(response.status);
                if (response.status != 200) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(function(json) {
                console.log('second then');
                bookArray = json;
                callback(json);
            })
            .catch(console.log);
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
            let options = {
                method: 'delete'
            };
            let path = parameter + `?id=${id}`;
            await fetch(path, options)
                .then(function(response) {
                    if (response.status != 200) {
                        throw new Error(`${response.status}: ${response.statusText}`);
                    }
                    console.log('delete');
                    location.reload();
                })
                .catch(console.log);
        }
    }

    function getInfoById(id) {
        return bookArray.find(x => x.id == id);
    }

    async function updateBook(book) {
        let options = {
            method: 'put',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(book)
        }
        const path = url + '/' + book.id;
        await fetch(path, options)
            .then(function(response) {
                if (response.status != 200) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
            })
            .catch(alert);
    }

    async function createBook(book) {
        let options = {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(book)
        }
        await fetch(url, options)
            .then(function(response) {
                if (response.status != 200) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                } else {
                    location.reload();
                }
            })
            .catch(console.log);
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