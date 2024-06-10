document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const accountId = document.getElementById('accountId').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const bankName = document.getElementById('bankName').value;
    const accountType = document.getElementById('accountType').value;
    const balance = document.getElementById('balance').value;
    const status = document.getElementById('status').value;
    const openingDate = document.getElementById('openingDate').value;
    const description = document.getElementById('description').value;

    const account = {
        accountNumber,
        bankName,
        accountType,
        balance,
        status,
        openingDate,
        description
    };

    if (accountId) {
        updateAccount(accountId, account);
    } else {
        saveAccount(account);
    }

    document.getElementById('accountForm').reset();
    displayAccounts();
});

function saveAccount(account) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function updateAccount(accountId, updatedAccount) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts = accounts.map(account => 
        account.accountNumber === accountId ? updatedAccount : account
    );
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function deleteAccount(accountNumber) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts = accounts.filter(account => account.accountNumber !== accountNumber);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    displayAccounts();
}

function editAccount(accountNumber) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const account = accounts.find(account => account.accountNumber === accountNumber);

    document.getElementById('accountId').value = account.accountNumber;
    document.getElementById('accountNumber').value = account.accountNumber;
    document.getElementById('bankName').value = account.bankName;
    document.getElementById('accountType').value = account.accountType;
    document.getElementById('balance').value = account.balance;
    document.getElementById('status').value = account.status;
    document.getElementById('openingDate').value = account.openingDate;
    document.getElementById('description').value = account.description;
}

function displayAccounts() {
    const accountList = document.getElementById('accountList');
    accountList.innerHTML = '';

    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.forEach(account => {
        const accountItem = document.createElement('div');
        accountItem.className = 'account-item';

        accountItem.innerHTML = `
            <div><strong>Número de cuenta:</strong> ${account.accountNumber}</div>
            <div><strong>Banco:</strong> ${account.bankName}</div>
            <div><strong>Tipo de cuenta:</strong> ${account.accountType}</div>
            <div><strong>Saldo actual:</strong> ${account.balance}</div>
            <div><strong>Estado:</strong> ${account.status}</div>
            <div><strong>Fecha de apertura:</strong> ${account.openingDate}</div>
            <div><strong>Descripción:</strong> ${account.description}</div>
            <button onclick="editAccount('${account.accountNumber}')">Editar</button>
            <button onclick="deleteAccount('${account.accountNumber}')">Borrar</button>
        `;

        accountList.appendChild(accountItem);
    });
}

document.addEventListener('DOMContentLoaded', displayAccounts);
