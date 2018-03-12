import Models from './models.js';
import PageFunction from './pageFunction.js';
import GLOBAL_CONST from './global.js';

const TableBuilder = (function() {
    let table;

    function initTable(tableHtmlId) {
        const tableId = '#' + tableHtmlId;
        table = $(tableId).dataTable({
            'ajax': {
                url: GLOBAL_CONST.URL,
                dataSrc: ''
            },
            'columns': [
                { data: 'Name' },
                { data: 'Genre' },
                { data: 'Author' },
                { data: 'IsHasCD' },
                { data: 'IsHasDVD' },
                { data: 'PublishingHouse' },
                {
                    data: 'id',
                    render: (id, type, full) => `<button class="delTableBtn btn btn-primary" value="${id}">Delete</button>`
                },
                {
                    data: 'id',
                    render: (id, type, full) => `<button class="infoTableBtn btn btn-primary" value="${id}">Info</button>`
                },
                {
                    data: 'id',
                    render: (id, type, full) => `<button class="editTableBtn btn btn-primary" value="${id}">Edit</button>`
                }
            ],
            initComplete: function() {
                this.api().columns().every(function() {
                    var column = this;
                    var select = $('<select><option value=""></option></select>')
                        .appendTo($(column.footer()).empty())
                        .on('change', function() {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function(d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });
                });
            }
        });
        table.on('draw.dt', function() {
            PageFunction.DrawTable();
        });
    }

    function updateTable() {
        table.dataTable().api().ajax.reload();
    }

    function buildDetailTable(book) {
        let proxy = Models.ProxyExample(book);
        let tableHTML;
        for (let key in proxy) {
            if (key == 'id' || key == 'type') {} else {
                tableHTML += `<tr><td>${key}</td><td>${proxy[key]}</td></tr>`;
            }
        }
        $('#infoTable').append(`<table id='detailTable' class='table'>`);
        $('#detailTable').append(tableHTML);
    }

    return {
        InitTable: function(tableHtmlId) {
            initTable(tableHtmlId);
        },
        CreateDetailTable: function(book) {
            buildDetailTable(book);
        },
        UpdateTable: function() {
            updateTable();
        }
    }
})();

export default TableBuilder;