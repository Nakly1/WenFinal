document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('transaction-form');
    const transactionTableBody = document.querySelector('#transaction-table tbody');

    // Cargar transacciones guardadas al iniciar
    loadTransactions();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const transaction = {
            id: Date.now(),
            type: document.getElementById('transaction-type').value,
            category: document.getElementById('category').value,
            amount: document.getElementById('amount').value,
            bankAccount: document.getElementById('bank-account').value,
            date: document.getElementById('transaction-date').value,
            description: document.getElementById('description').value,
            attachment: document.getElementById('attachment').files[0]
        };

        const reader = new FileReader();
        reader.onload = function(e) {
            transaction.attachmentUrl = e.target.result;
            saveTransaction(transaction);
            addTransactionToTable(transaction);
            form.reset();
        };

        if (transaction.attachment) {
            reader.readAsDataURL(transaction.attachment);
        } else {
            transaction.attachmentUrl = '';
            saveTransaction(transaction);
            addTransactionToTable(transaction);
            form.reset();
        }
    });

    function addTransactionToTable(transaction) {
        const row = document.createElement('tr');
        row.setAttribute('data-id', transaction.id);

        row.innerHTML = `
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.bankAccount}</td>
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.attachmentUrl ? `<img src="${transaction.attachmentUrl}" alt="Adjunto">` : ''}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;

        transactionTableBody.appendChild(row);

        const editButton = row.querySelector('.edit-btn');
        const deleteButton = row.querySelector('.delete-btn');

        editButton.addEventListener('click', function() {
            editTransaction(row, transaction);
        });

        deleteButton.addEventListener('click', function() {
            deleteTransaction(row, transaction.id);
        });
    }

    function saveTransaction(transaction) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function loadTransactions() {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.forEach(transaction => {
            addTransactionToTable(transaction);
        });
    }

    function editTransaction(row, transaction) {
        document.getElementById('transaction-type').value = transaction.type;
        document.getElementById('category').value = transaction.category;
        document.getElementById('amount').value = transaction.amount;
        document.getElementById('bank-account').value = transaction.bankAccount;
        document.getElementById('transaction-date').value = transaction.date;
        document.getElementById('description').value = transaction.description;

        if (transaction.attachment) {
            const fileInput = document.getElementById('attachment');
            fileInput.value = '';
        }

        deleteTransaction(row, transaction.id);
    }

    function deleteTransaction(row, id) {
        row.remove();
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions = transactions.filter(transaction => transaction.id !== id);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
});
