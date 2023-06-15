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

        productNameElement.addEventListener('click', function() {
            const inputField = document.createElement('input');
            inputField.className = 'edit-name-input';
            inputField.value = productNameElement.innerText;
            productNameContainer.replaceChild(inputField, productNameElement);
            inputField.focus();

            inputField.addEventListener('blur', function() {
                const editedName = inputField.value.trim();
                if (editedName !== '') {
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

        minusButton.addEventListener('click', function (){
            let count = parseInt(countDisplay.innerText);
            if (count > 1) {
                count--;
                countDisplay.innerText = count.toString();
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

        plusButton.addEventListener('click', function (){
            let count = parseInt(countDisplay.innerText);
                count++;
                countDisplay.innerText = count.toString();
            updateMinusButton();
        });

        counter.appendChild(minusButton);
        counter.appendChild(countDisplay);
        counter.appendChild(plusButton);

        function updateMinusButton() {
            if(parseInt(countDisplay.innerText) === 1) {
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
            } else {
                productInfo.classList.add('purchased');
                boughtButton.innerText = 'Не куплено';
                hideEditButtons();
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
            productInfo.remove();
        });

        buySection.appendChild(boughtButton);
        buySection.appendChild(deleteButton);

        productDetails.appendChild(counter);
        productDetails.appendChild(buySection);

        productInfo.appendChild(productDetails);

        updateMinusButton();

        showEditButtons();

        return productInfo;
    }
});

