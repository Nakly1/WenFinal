document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('alert-form');
    const alertTableBody = document.querySelector('#alert-table tbody');
    const alertTypeSelect = document.getElementById('alert-type');
    const customAlertTypeInput = document.getElementById('custom-alert-type');

    alertTypeSelect.addEventListener('change', function() {
        if (alertTypeSelect.value === 'Otro') {
            customAlertTypeInput.style.display = 'block';
            customAlertTypeInput.required = true;
        } else {
            customAlertTypeInput.style.display = 'none';
            customAlertTypeInput.required = false;
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const alertType = alertTypeSelect.value === 'Otro' ? customAlertTypeInput.value : alertTypeSelect.value;
        const alert = {
            type: alertType,
            description: document.getElementById('alert-description').value,
            dateTime: document.getElementById('alert-date-time').value,
            repetition: document.getElementById('alert-repetition').value || 'Una vez'
        };

        addAlertToTable(alert);
        form.reset();
        customAlertTypeInput.style.display = 'none';
    });

    function addAlertToTable(alert) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${alert.type}</td>
            <td>${alert.description}</td>
            <td>${alert.dateTime}</td>
            <td>${alert.repetition}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;

        alertTableBody.appendChild(row);

        const editButton = row.querySelector('.edit-btn');
        const deleteButton = row.querySelector('.delete-btn');

        editButton.addEventListener('click', function() {
            editAlert(row, alert);
        });

        deleteButton.addEventListener('click', function() {
            deleteAlert(row);
        });
    }

    function editAlert(row, alert) {
        if (alertTypeSelect.value === 'Otro') {
            customAlertTypeInput.value = alert.type;
            customAlertTypeInput.style.display = 'block';
        } else {
            alertTypeSelect.value = alert.type;
            customAlertTypeInput.style.display = 'none';
        }
        document.getElementById('alert-description').value = alert.description;
        document.getElementById('alert-date-time').value = alert.dateTime;
        document.getElementById('alert-repetition').value = alert.repetition;

        row.remove();
    }

    function deleteAlert(row) {
        row.remove();
    }
});
