import Models from './models.js';
import PageFunction from './pageFunction.js';

const TableBuilder = (function() {
    let divId;
    const bookTableObj = document.createElement('table');
    const detailTableObj = document.createElement('table');

    function initTableBuilder(containerId) {
        divId = containerId;
    }

    function buildBooksTable(array) {
        bookTableObj.setAttribute('border', '1');

        bookTableObj.setAttribute('id', 'BooksTable');

        let tableHTML = '<caption>Books</caption><thead><tr>';
        tableHTML += `
        <th> Name </th>
        <th> Genre </th>
        <th> Author </th>
        <th> IsHasCD </th>
        <th> IsHasDVD </th>
        <th> PublishingHouse </th>
        <th> Delete </th>
        <th> Info </th>
        <th> Edit </th>
        </tr></thead>`;
        for (let i = 0; i < array.length; i++) {
            tableHTML += `<tr>
                <td> ${array[i].Name}</td>
                <td> ${array[i].Genre}</td>
                <td> ${array[i].Author}</td>
                <td> ${array[i].IsHasCD}</td>
                <td> ${array[i].IsHasDVD}</td>
                <td> ${array[i].PublishingHouse}</td>
                <td><button class="delTableBtn" value="${array[i].id}">Delete</button></td>
                <td><button class="infoTableBtn" value="${array[i].id}">Info</button></td>
                <td><button class="editTableBtn" value="${array[i].id}">Edit</button></td>
                </tr>`;
        }
        bookTableObj.innerHTML = tableHTML;
        document.getElementById(divId).appendChild(bookTableObj);
    }

    function buildDetailTable(book) {
        //let proxy = Models.ProxyExample(book);
        console.log(book.GetInfo());
        detailTableObj.setAttribute('border', '1');
        detailTableObj.setAttribute('id', 'DetailTable');
        let tableHTML = '<caption>Detail</caption>';
        for (let key in book) {
            if (key == 'id' || key == 'type') {} else {
                tableHTML += `<tr><td>${key}</td><td>${book[key]}</td></tr>`;
            }
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

export default TableBuilder;