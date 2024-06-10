document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#expenses-table tbody');

    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const addRow = (mes, ingresos = '', egresos = '') => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mes}</td>
            <td>${ingresos}</td>
            <td>${egresos}</td>
        `;
        tableBody.appendChild(row);
    };

    meses.forEach(mes => addRow(mes));
});
