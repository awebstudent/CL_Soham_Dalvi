"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTable = void 0;
function generateTable(data) {
    let table = `
    <table border="1">
      <tr>
        <th>ID</th>
        <th>City</th>
        <th>Country</th>
        <th>Date</th>
        <th>Weather</th>
      </tr>
  `;
    data.forEach(item => {
        table += `
      <tr>
        <td>${item.id}</td>
        <td>${item.city}</td>
        <td>${item.country}</td>
        <td>${item.date}</td>
        <td>${item.weather}</td>
      </tr>
    `;
    });
    table += `</table>`;
    return table;
}
exports.generateTable = generateTable;
//# sourceMappingURL=genTable.js.map