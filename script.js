document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.adding-product');
    const inputField = document.querySelector('.product-search');
    const productList = document.querySelector('.block-left');

    addButton.addEventListener('click', function() {
        const productName = inputField.value.trim();
        if (productName !== '') {
            const newProduct = createProductElement(productName);
            productList.appendChild(newProduct);
            inputField.value = '';
            inputField.focus();
        }
    });

    function createProductElement(name) {
        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        const productNameContainer = document.createElement('div');
        productNameContainer.className = 'product-name-container';

        const productNameElement = document.createElement('div');
        productNameElement.className = 'product-name';
        productNameElement.innerText = name;

        productNameContainer.appendChild(productNameElement);
        productInfo.appendChild(productNameContainer);

        const productDetails = document.createElement('div');
        productDetails.className = 'product-details';

        const counter = document.createElement('div');
        counter.className = 'counter';

        const minusButton = document.createElement('button');
        minusButton.className = 'round-button-red';
        minusButton.type = 'button';
        minusButton.dataset.tooltip = 'Мінус';
        minusButton.innerText = '-';

        const countDisplay = document.createElement('div');
        countDisplay.className = 'count-display';
        countDisplay.style.fontFamily = 'Arial';
        countDisplay.style.fontSize = 'small';
        countDisplay.style.fontWeight = 'bold';
        countDisplay.innerText = '1';

        const plusButton = document.createElement('button');
        plusButton.className = 'round-button-green';
        plusButton.type = 'button';
        plusButton.dataset.tooltip = 'Плюс';
        plusButton.innerText = '+';

        counter.appendChild(minusButton);
        counter.appendChild(countDisplay);
        counter.appendChild(plusButton);

        const buySection = document.createElement('section');
        buySection.className = 'buy-section';

        const boughtButton = document.createElement('button');
        boughtButton.className = 'button-bought';
        boughtButton.style.fontFamily = 'Arial';
        boughtButton.style.fontSize = 'small';
        boughtButton.style.fontWeight = 'bold';
        boughtButton.dataset.tooltip = 'Куплено';
        boughtButton.innerText = 'Куплено';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'button-square';
        deleteButton.style.fontFamily = 'Arial';
        deleteButton.style.fontSize = 'small';
        deleteButton.style.fontWeight = 'bold';
        deleteButton.dataset.tooltip = 'Видалити товар';
        deleteButton.innerText = 'х';

        deleteButton.addEventListener('click', function() {
            productInfo.remove();
        });

        buySection.appendChild(boughtButton);
        buySection.appendChild(deleteButton);

        productDetails.appendChild(counter);
        productDetails.appendChild(buySection);

        productInfo.appendChild(productDetails);

        return productInfo;
    }
});

