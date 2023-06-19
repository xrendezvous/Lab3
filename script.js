document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.adding-product');
    const inputField = document.querySelector('.product-search');
    const productList = document.querySelector('.block-left');
    const remainingProductsContainer = document.getElementById('remaining-products');
    const purchasedProductsContainer = document.getElementById('purchased-products');

    addButton.addEventListener('click', addProduct);
    inputField.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            addProduct();
        }
    });

    function addProduct() {
        const productName = inputField.value.trim();
        if (productName !== '') {
            if (isDuplicateProduct(productName)) {
                window.alert('A product with this name already exists');
            } else {
                const newProduct = createProductElement(productName);
                productList.appendChild(newProduct);
                inputField.value = '';
                inputField.focus();
                updateStatistics();
            }
        }
    }

    function isDuplicateProduct(productName) {
        const existingProducts = productList.querySelectorAll('.product-name');
        for (let i = 0; i < existingProducts.length; i++) {
            if (existingProducts[i].innerText.toLowerCase() === productName.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    function createProductElement(name) {
        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        const productNameContainer = document.createElement('div');
        productNameContainer.className = 'product-name-container';

        const productNameElement = document.createElement('div');
        productNameElement.className = 'product-name';
        productNameElement.innerText = name;

        productNameElement.addEventListener('click', function() {
            const inputField = document.createElement('input');
            inputField.className = 'edit-name-input';
            inputField.value = productNameElement.innerText;
            productNameContainer.replaceChild(inputField, productNameElement);
            inputField.focus();

            inputField.addEventListener('blur', function() {
                const editedName = inputField.value.trim();
                if (editedName !== '') {
                    if (isDuplicateProduct(editedName)) {
                        window.alert('A product with this name already exists');
                    } else {
                        productNameElement.innerText = editedName;
                    }
                }
                productNameContainer.replaceChild(productNameElement, inputField);
                updateStatistics();
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
            let count = parseInt(countDisplay.innerText);
            if (count > 1) {
                count--;
                countDisplay.innerText = count.toString();
                updateStatistics();
            }
            updateMinusButton();
        });

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

        plusButton.addEventListener('click', function() {
            let count = parseInt(countDisplay.innerText);
            count++;
            countDisplay.innerText = count.toString();
            updateStatistics();
            updateMinusButton();
        });

        counter.appendChild(minusButton);
        counter.appendChild(countDisplay);
        counter.appendChild(plusButton);

        function updateMinusButton() {
            if (parseInt(countDisplay.innerText) === 1) {
                minusButton.className = 'disabled-round-button-red';
            } else {
                minusButton.className = 'round-button-red';
            }
        }

        const buySection = document.createElement('section');
        buySection.className = 'buy-section';

        const boughtButton = document.createElement('button');
        boughtButton.className = 'button-bought';
        boughtButton.style.fontFamily = 'Arial';
        boughtButton.style.fontSize = 'small';
        boughtButton.style.fontWeight = 'bold';
        boughtButton.dataset.tooltip = 'Куплено';
        boughtButton.innerText = 'Куплено';

        boughtButton.addEventListener('click', function() {
            const isPurchased = productInfo.classList.contains('purchased');
            if (isPurchased) {
                productInfo.classList.remove('purchased');
                boughtButton.innerText = 'Куплено';
                showEditButtons();
                remainingProductsContainer.appendChild(productIcon);
                purchasedProductsContainer.removeChild(productIcon);
            } else {
                productInfo.classList.add('purchased');
                boughtButton.innerText = 'Не куплено';
                hideEditButtons();
                purchasedProductsContainer.appendChild(productIcon);
                remainingProductsContainer.removeChild(productIcon);
            }
            updateStatistics();
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
            productInfo.remove();
            remainingProductsContainer.removeChild(productIcon);
            updateStatistics();
        });

        const productIcon = document.createElement('section');
        productIcon.className = 'product-icon';

        const productNameIcon = document.createElement('span');
        productNameIcon.className = 'icon-product-name';
        productNameIcon.style.fontFamily = 'Arial';
        productNameIcon.style.fontSize = 'small';
        productNameIcon.style.fontWeight = 'bold';
        productNameIcon.innerText = name;

        const productAmountIcon = document.createElement('div');
        productAmountIcon.className = 'icon-product-amount';
        productAmountIcon.style.color = 'white';
        productAmountIcon.style.fontFamily = 'Arial';
        productAmountIcon.style.fontWeight = 'bold';
        productAmountIcon.innerText = countDisplay.innerText;

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

    function updateStatistics() {
        const productInfos = document.querySelectorAll('.product-info');
        const remainingProductsContainer = document.getElementById('remaining-products');
        const purchasedProductsContainer = document.getElementById('purchased-products');

        // Clear existing products in statistics
        remainingProductsContainer.innerHTML = '';
        purchasedProductsContainer.innerHTML = '';

        productInfos.forEach(function(productInfo) {
            const countDisplay = productInfo.querySelector('.count-display');
            const productName = productInfo.querySelector('.product-name').innerText;
            const isPurchased = productInfo.classList.contains('purchased');
            const count = parseInt(countDisplay.innerText);

            // Update the quantity in the statistics
            const productIcon = document.createElement('section');
            productIcon.className = 'product-icon';

            const productNameIcon = document.createElement('span');
            productNameIcon.className = 'icon-product-name';
            productNameIcon.style.fontFamily = 'Arial';
            productNameIcon.style.fontSize = 'small';
            productNameIcon.style.fontWeight = 'bold';
            productNameIcon.innerText = productName;

            const productAmountIcon = document.createElement('div');
            productAmountIcon.className = 'icon-product-amount';
            productAmountIcon.style.color = 'white';
            productAmountIcon.style.fontFamily = 'Arial';
            productAmountIcon.style.fontWeight = 'bold';
            productAmountIcon.innerText = count.toString();

            productIcon.appendChild(productNameIcon);
            productIcon.appendChild(productAmountIcon);

            if (isPurchased) {
                purchasedProductsContainer.appendChild(productIcon);
            } else {
                remainingProductsContainer.appendChild(productIcon);
            }
        });
    }

    const initialProducts = ['Помідори', 'Печиво', 'Сир'];

    initialProducts.forEach(function(product) {
        const newProduct = createProductElement(product);
        productList.appendChild(newProduct);
    });

    updateStatistics();
});



