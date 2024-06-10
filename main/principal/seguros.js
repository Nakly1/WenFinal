let activeInsurance = false;

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.querySelector('.extra-content').style.display = 'block';
    });
    card.addEventListener('mouseout', () => {
        card.querySelector('.extra-content').style.display = 'none';
    });

    const buyButton = card.querySelector('.buy-button');
    const deleteButton = card.querySelector('.delete-button');

    buyButton.addEventListener('click', () => {
        if (activeInsurance) {
            alert('Ya tienes un seguro activo. No puedes comprar otro.');
        } else {
            alert('¡Seguro activado!');
            activeInsurance = true;
            buyButton.style.display = 'none';
            deleteButton.style.display = 'inline-block';
        }
    });

    deleteButton.addEventListener('click', () => {
        alert('Seguro borrado.');
        activeInsurance = false;
        buyButton.style.display = 'inline-block';
        deleteButton.style.display = 'none';
    });
});
