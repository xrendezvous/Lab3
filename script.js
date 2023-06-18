class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(name) {
        if (name.trim() !== '') {
            const newProduct = this.createProduct(name);
            this.products.push(newProduct);
            return newProduct;
        }
    }

    createProduct(name) {
        const product = {
            name: name,
            count: 1,
            purchased: false
        };

        return product;
    }

    updateProductCount(product, count) {
        product.count = count;
    }

    toggleProductPurchased(product) {
        product.purchased = !product.purchased;
    }

    deleteProduct(product) {
        const index = this.products.indexOf(product);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }
}

const productManager = new ProductManager();

const addButton = document.querySelector('.adding-product');
const inputField = document.querySelector('.product-search');
const productList = document.querySelector('.block-left');

addButton.addEventListener('click', function() {
    const productName = inputField.value.trim();
    const newProduct = productManager.addProduct(productName);
    if (newProduct) {
        const productElement = createProductElement(newProduct);
        productList.appendChild(productElement);
        inputField.value = '';
        inputField.focus();
    }
});

function createProductElement(product) {
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';

    const productNameContainer = document.createElement('div');
    productNameContainer.className = 'product-name-container';

    const productNameElement = document.createElement('div');
    productNameElement.className = 'product-name';
    productNameElement.innerText = product.name;

    productNameElement.addEventListener('click', function() {
        const inputField = document.createElement('input');
        inputField.className = 'edit-name-input';
        inputField.value = productNameElement.innerText;
        productNameContainer.replaceChild(inputField, productNameElement);
        inputField.focus();

        inputField.addEventListener('blur', function() {
            const editedName = inputField.value.trim();
            if (editedName !== '') {
                product.name = editedName;
                productNameElement.innerText = editedName;
            }
            productNameContainer.replaceChild(productNameElement, inputField);
        });
    });

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

    minusButton.addEventListener('click', function() {
        if (product.count > 1) {
            product.count--;
            countDisplay.innerText = product.count.toString();
        }
        updateMinusButton();
    });

    const countDisplay = document.createElement('div');
    countDisplay.className = 'count-display';
    countDisplay.style.fontFamily = 'Arial';
    countDisplay.style.fontSize = 'small';
    countDisplay.style.fontWeight = 'bold';
    countDisplay.innerText = product.count.toString();

    const plusButton = document.createElement('button');
    plusButton.className = 'round-button-green';
    plusButton.type = 'button';
    plusButton.dataset.tooltip = 'Плюс';
    plusButton.innerText = '+';

    plusButton.addEventListener('click', function() {
        product.count++;
        countDisplay.innerText = product.count.toString();
        updateMinusButton();
    });

    counter.appendChild(minusButton);
    counter.appendChild(countDisplay);
    counter.appendChild(plusButton);

    function updateMinusButton() {
        if (product.count === 1) {
            minusButton.className = 'disabled-round-button-red';
        } else {
            minusButton.className = 'round-button-red';
        }
    }

    const buySection = document.createElement('section');
    buySection.className = 'buy-section';

    const remainingProductsContainer = document.getElementById('remaining-products');
    const purchasedProductsContainer = document.getElementById('purchased-products');

    const boughtButton = document.createElement('button');
    boughtButton.className = 'button-bought';
    boughtButton.style.fontFamily = 'Arial';
    boughtButton.style.fontSize = 'small';
    boughtButton.style.fontWeight = 'bold';
    boughtButton.dataset.tooltip = 'Куплено';
    boughtButton.innerText = 'Куплено';

    boughtButton.addEventListener('click', function() {
        productManager.toggleProductPurchased(product);
        if (product.purchased) {
            boughtButton.innerText = 'Не куплено';
            hideEditButtons();
            purchasedProductsContainer.appendChild(productIcon);
            remainingProductsContainer.removeChild(productIcon);
        } else {
            boughtButton.innerText = 'Куплено';
            showEditButtons();
            remainingProductsContainer.appendChild(productIcon);
            purchasedProductsContainer.removeChild(productIcon);
        }
    });

    function hideEditButtons() {
        minusButton.style.display = 'none';
        plusButton.style.display = 'none';
        deleteButton.style.display = 'none';
    }

    function showEditButtons() {
        minusButton.style.display = 'inline-block';
        plusButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'button-square';
    deleteButton.style.fontFamily = 'Arial';
    deleteButton.style.fontSize = 'small';
    deleteButton.style.fontWeight = 'bold';
    deleteButton.dataset.tooltip = 'Видалити товар';
    deleteButton.innerText = 'х';

    deleteButton.addEventListener('click', function() {
        productManager.deleteProduct(product);
        productInfo.remove();
        remainingProductsContainer.removeChild(productIcon);
    });

    const productIcon = document.createElement('section');
    productIcon.className = 'product-icon';

    const productNameIcon = document.createElement('span');
    productNameIcon.className = 'icon-product-name';
    productNameIcon.style.fontFamily = 'Arial';
    productNameIcon.style.fontSize = 'small';
    productNameIcon.style.fontWeight = 'bold';
    productNameIcon.innerText = product.name;

    const productAmountIcon = document.createElement('div');
    productAmountIcon.className = 'icon-product-amount';
    productAmountIcon.style.color = 'white';
    productAmountIcon.style.fontFamily = 'Arial';
    productAmountIcon.style.fontWeight = 'bold';
    productAmountIcon.innerText = product.count.toString();

    productIcon.appendChild(productNameIcon);
    productIcon.appendChild(productAmountIcon);

    remainingProductsContainer.appendChild(productIcon);

    buySection.appendChild(boughtButton);
    buySection.appendChild(deleteButton);

    productDetails.appendChild(counter);
    productDetails.appendChild(buySection);

    productInfo.appendChild(productDetails);

    updateMinusButton();

    showEditButtons();

    return productInfo;
}

const existingItems = productManager.products;

existingItems.forEach(function(item) {
    const countDisplay = item.count;
    const minusButton = item.querySelector('.round-button-red');
    const plusButton = item.querySelector('.round-button-green');
    const deleteButton = item.querySelector('.button-square');
    const boughtButton = item.querySelector('.button-bought');

    minusButton.addEventListener('click', function() {
        if (countDisplay > 1) {
            item.count--;
            countDisplay.innerText = item.count.toString();
        }
        updateMinusButton();
    });

    plusButton.addEventListener('click', function() {
        item.count++;
        countDisplay.innerText = item.count.toString();
        updateMinusButton();
    });

    deleteButton.addEventListener('click', function() {
        productManager.deleteProduct(item);
        item.remove();
    });

    boughtButton.addEventListener('click', function() {
        productManager.toggleProductPurchased(item);
        if (item.purchased) {
            boughtButton.innerText = 'Не куплено';
            hideEditButtons();
        } else {
            boughtButton.innerText = 'Куплено';
            showEditButtons();
        }
    });

    function updateMinusButton() {
        if (item.count === 1) {
            minusButton.className = 'disabled-round-button-red';
        } else {
            minusButton.className = 'round-button-red';
        }
    }

    function hideEditButtons() {
        minusButton.style.display = 'none';
        plusButton.style.display = 'none';
        deleteButton.style.display = 'none';
    }

    function showEditButtons() {
        minusButton.style.display = 'inline-block';
        plusButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
    }
});


