// This file contains the JavaScript code that utilizes jQuery to make AJAX requests.
// It exports functions for fetching data from a server and updating the DOM with the received data.

$(document).ready(function() {
    $('#fetchDataButton').click(function() {
        fetchData();
    });
});

let todosData = [];
let currentPage = 1;
const rowsPerPage = 10;

function fetchData() {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'GET',
        success: function(data) {
            todosData = data;
            currentPage = 1; // Reset to first page
            // Update the DOM with the fetched data
            updateDOM(data);
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });
}

function updateDOM(data) {
    const todoTableBody = $('#todoTable tbody');
    todoTableBody.empty();

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = todosData.slice(start, end);
    if (pageData.length === 0) {
        todoTableBody.append('<tr><td colspan="3">No data available</td></tr>');
        return;
    }
    // Populate the table with the data
    pageData.forEach(function(todo) {
        const row = $('<tr></tr>');
        row.append($('<td></td>').text(todo.userId));
        row.append($('<td></td>').text(todo.id));
        row.append($('<td></td>').text(todo.title));
        row.append($('<td></td>').text(todo.completed ? 'Yes' : 'No'));
        todoTableBody.append(row);
    });
       // Update page info
    $('#pageInfo').text(`Page ${currentPage} of ${Math.ceil(todosData.length / rowsPerPage)}`);
    $('#prevPage').prop('disabled', currentPage === 1);
    $('#nextPage').prop('disabled', end >= todosData.length);
}

$(document).ready(function() {
    $('#fetchDataButton').click(function() {
        fetchData();
    });

    $('#prevPage').click(function() {
        if (currentPage > 1) {
            currentPage--;
            updateDOM();
        }
    });

    $('#nextPage').click(function() {
        if (currentPage * rowsPerPage < todosData.length) {
            currentPage++;
            updateDOM();
        }
    });
});