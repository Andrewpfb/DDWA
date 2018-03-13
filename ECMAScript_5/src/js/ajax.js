import TableBuilder from './table.js';
import PageFunction from './pageFunction.js';
import GLOBAL_CONST from './global.js';
import Models from './models.js';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const AjaxHelper = (function() {
    let url;

    function initAjax(initUrl) {
        url = initUrl;
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
                TableBuilder.UpdateTable();
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function getInfoById(id) {
        const options = {
            method: 'get'
        };
        const path = url + '/' + id;
        let book;
        try {
            const response = await fetch(path, options);
            const bookFromServer = await response.json();
            if (bookFromServer.Type == GLOBAL_CONST.AUDIO_TYPE) {
                book = Models.CreateAudioBook(bookFromServer);
            } else if (bookFromServer.Type == GLOBAL_CONST.SCHOOL_TYPE) {
                book = Models.CreateSchoolBook(bookFromServer);
            }
        } catch (err) {
            console.log(err);
        }
        return book;
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
            TableBuilder.UpdateTable();
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
            TableBuilder.UpdateTable();
        } catch (err) {
            console.log(err);
        }
    }

    return {
        InitAjax: function(url) {
            initAjax(url);
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

export default AjaxHelper;