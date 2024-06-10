document.getElementById('transactionTypeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const transactionTypeId = document.getElementById('transactionTypeId').value;
    const transactionCode = document.getElementById('transactionCode').value;
    const transactionName = document.getElementById('transactionName').value;
    const transactionDescription = document.getElementById('transactionDescription').value;
    const transactionType = document.getElementById('transactionType').value;
    const transactionCategory = document.getElementById('transactionCategory').value;

    const transactionTypeData = {
        transactionCode,
        transactionName,
        transactionDescription,
        transactionType,
        transactionCategory
    };

    if (transactionTypeId) {
        updateTransactionType(transactionTypeId, transactionTypeData);
    } else {
        saveTransactionType(transactionTypeData);
    }

    document.getElementById('transactionTypeForm').reset();
    displayTransactionTypes();
});

function saveTransactionType(transactionTypeData) {
    let transactionTypes = JSON.parse(localStorage.getItem('transactionTypes')) || [];
    transactionTypes.push(transactionTypeData);
    localStorage.setItem('transactionTypes', JSON.stringify(transactionTypes));
}

function updateTransactionType(transactionTypeId, updatedTransactionType) {
    let transactionTypes = JSON.parse(localStorage.getItem('transactionTypes')) || [];
    transactionTypes = transactionTypes.map(type => 
        type.transactionCode === transactionTypeId ? updatedTransactionType : type
    );
    localStorage.setItem('transactionTypes', JSON.stringify(transactionTypes));
}

function deleteTransactionType(transactionCode) {
    let transactionTypes = JSON.parse(localStorage.getItem('transactionTypes')) || [];
    transactionTypes = transactionTypes.filter(type => type.transactionCode !== transactionCode);
    localStorage.setItem('transactionTypes', JSON.stringify(transactionTypes));
    displayTransactionTypes();
}

function editTransactionType(transactionCode) {
    let transactionTypes = JSON.parse(localStorage.getItem('transactionTypes')) || [];
    const transactionTypeData = transactionTypes.find(type => type.transactionCode === transactionCode);

    document.getElementById('transactionTypeId').value = transactionTypeData.transactionCode;
    document.getElementById('transactionCode').value = transactionTypeData.transactionCode;
    document.getElementById('transactionName').value = transactionTypeData.transactionName;
    document.getElementById('transactionDescription').value = transactionTypeData.transactionDescription;
    document.getElementById('transactionType').value = transactionTypeData.transactionType;
    document.getElementById('transactionCategory').value = transactionTypeData.transactionCategory;
}

function displayTransactionTypes() {
    const transactionTypeList = document.getElementById('transactionTypeList');
    transactionTypeList.innerHTML = '';

    let transactionTypes = JSON.parse(localStorage.getItem('transactionTypes')) || [];
    transactionTypes.forEach(type => {
        const transactionTypeItem = document.createElement('div');
        transactionTypeItem.className = 'transaction-type-item';

        transactionTypeItem.innerHTML = `
            <div><strong>Código:</strong> ${type.transactionCode}</div>
            <div><strong>Nombre del tipo:</strong> ${type.transactionName}</div>
            <div><strong>Descripción:</strong> ${type.transactionDescription}</div>
            <div><strong>Tipo:</strong> ${type.transactionType}</div>
            <div><strong>Categoría:</strong> ${type.transactionCategory || 'N/A'}</div>
            <button onclick="editTransactionType('${type.transactionCode}')">Editar</button>
            <button onclick="deleteTransactionType('${type.transactionCode}')">Borrar</button>
        `;

        transactionTypeList.appendChild(transactionTypeItem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayTransactionTypes();
});
