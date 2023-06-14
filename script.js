// Get the necessary DOM elements
const inputField = document.querySelector('.product-search');
const addButton = document.querySelector('.adding-product');
const productList = document.querySelector('.block-left');

// Add event listener to the add button
addButton.addEventListener('click', () => {
    // Get the value from the input field
    const productName = inputField.value;

    // Create the HTML elements for the new product
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';

    const productNameContainer = document.createElement('div');
    productNameContainer.className = 'product-name-container';

    const productNameElement = document.createElement('div');
    productNameElement.className = 'product-name';
    productNameElement.textContent = productName;

    productNameContainer.appendChild(productNameElement);
    productInfo.appendChild(productNameContainer);

    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';

    const counter = document.createElement('div');
    counter.className = 'counter';

    const minusButton = document.createElement('button');
    minusButton.className = 'round-button-red';
    minusButton.type = 'button';
    minusButton.textContent = '-';
    minusButton.setAttribute('data-tooltip', 'Мінус');

    const countDisplay = document.createElement('div');
    countDisplay.className = 'count-display';
    countDisplay.textContent = '0';

    const plusButton = document.createElement('button');
    plusButton.className = 'round-button-green';
    plusButton.type = 'button';
    plusButton.textContent = '+';
    plusButton.setAttribute('data-tooltip', 'Плюс');

    counter.appendChild(minusButton);
    counter.appendChild(countDisplay);
    counter.appendChild(plusButton);

    const buySection = document.createElement('section');
    buySection.className = 'buy-section';

    const boughtButton = document.createElement('button');
    boughtButton.className = 'button-bought';
    boughtButton.textContent = 'Куплено';
    boughtButton.setAttribute('data-tooltip', 'Куплено');

    const deleteButton = document.createElement('button');
    deleteButton.className = 'button-square';
    deleteButton.textContent = 'х';
    deleteButton.setAttribute('data-tooltip', 'Видалити товар');

    buySection.appendChild(boughtButton);
    buySection.appendChild(deleteButton);

    productDetails.appendChild(counter);
    productDetails.appendChild(buySection);

    productInfo.appendChild(productDetails);

    // Add the new product to the product list
    productList.appendChild(productInfo);

    // Clear the input field
    inputField.value = '';

    // Set the focus back to the input field
    inputField.focus();
});
