"use strict";

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
        <td> Name </td>
        <td> Author </td>
        <td> Genre </td>
        <td> IsHasCD </td>
        <td> IsHasDVD </td>
        <td> PublishingHouse </td>
        <td> Delete </td>
        <td> Info </td>
        <td> Edit </td>
        </tr></thead>`;
        for (let i = 0; i < array.length; i++) {
            tableHTML += `<tr>
                <td> ${array[i].Name}</td>
                <td> ${array[i].Author}</td>
                <td> ${array[i].Genre}</td>
                <td> ${array[i].IsHasCD}</td>
                <td> ${array[i].IsHasDVD}</td>
                <td> ${array[i].PublishingHouse}</td>
                <td><button onclick="Delete('${array[i].id}')">Delete</button></td>
                <td><button onclick="Info('${array[i].id}')">Info</button></td>
                <td><button onclick="Edit('${array[i].id}')">Edit</button></td>
                </tr>`;
        }
        bookTableObj.innerHTML = tableHTML;
        document.getElementById(divId).appendChild(bookTableObj);
    }

    function buildDetailTable(book) {
        let proxy = Models.ProxyExample(book);
        console.log(proxy.GetInfo());
        detailTableObj.setAttribute('border', '1');
        detailTableObj.setAttribute('id', 'DetailTable');
        let tableHTML = '<caption>Detail</caption>';
        for (let key in proxy) {
            if (key == 'id' || key == 'type') {} else {
                tableHTML += `<tr><td>${key}</td><td>${proxy[key]}</td></tr>`;
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