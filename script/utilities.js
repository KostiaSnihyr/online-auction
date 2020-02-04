function checkboxesToFalse(arrCheckboxes) {
    for (let i = 0; i < arrCheckboxes.length; i++) {
        arrCheckboxes[i].checked = false;
    }
}

function removeFromArr(el, arr) {
    if(arr) {
        return arr.filter(function (a) {
            return a !== el;
        });
    }
}

function createProd(prod) {
    const prodWrapper = document.createElement('div');
    const img = document.createElement('img');
    const description = document.createElement('p');
    const title = document.createElement('h3');
    const titleLink = document.createElement('a');

    prodWrapper.className = 'product';
    img.className = 'product-img';
    titleLink.setAttribute('href', 'product.html?id=' + prod.id);

    img.setAttribute('src', prod.image);
    description.innerHTML = "price: ".concat(prod.price, " <br> color: ").concat(prod.color, " <br> rank: ").concat(prod.rank);
    if ('size' in prod) {
       description.innerHTML += " <br> size ".concat(prod.size);
    }
    titleLink.innerText = prod.title;
    title.appendChild(titleLink);

    prodWrapper.appendChild(img);
    prodWrapper.appendChild(title);
    prodWrapper.appendChild(description);

    return prodWrapper;
}