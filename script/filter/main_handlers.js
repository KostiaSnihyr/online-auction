// <price
for(let i = 0; i < inputsPrice.length; i++) {
    inputsPrice[i].addEventListener('input', function() {
        let typeOfPrice = this.getAttribute('data-filter'); // min / max
        let price = parseFloat(this.value);

        if(!isNaN(price)) filterPrice[ typeOfPrice ] = price;
        else delete filterPrice[typeOfPrice];

        resultProds = handleFilterProds(filterObj, prods, filterPrice);
    });
}
// </price

resultProds = handleFilterProds(filterObj, prods, filterPrice);

searchProd.addEventListener('input', function(e) {
    showProducts(wrapperProducts, resultProds.filter(prod => prod.title.toLowerCase().indexOf(this.value.toLowerCase()) !== -1));
})

// <pagination
containerPagination.addEventListener('click', function(e) {
    const el = e.target;

    if(el.tagName === 'BUTTON') {
        sortPaginationObj.curPage = +el.getAttribute('data-page');
        
        let oldActive = this.querySelector('.active');
        if(oldActive) oldActive.className = '';
        el.className = 'active';
        
        showProducts(wrapperProducts, resultProds);
    }
});

selectPagination.addEventListener('change', function() {
    let prodOnPage = selectPagination[this.selectedIndex].value; //how many items on the page
    sortPaginationObj.onPage = prodOnPage;
    sortPaginationObj.curPage = 0;

    resultProds = handleFilterProds(filterObj, prods, filterPrice);
});
// </pagination

selectSort.addEventListener('change', function() {
    let arrSelectValue = optionsSort[this.selectedIndex].value.split('_');
    sortPaginationObj.sortProp = arrSelectValue[0];
    sortPaginationObj.k = arrSelectValue[1];
    sortPaginationObj.curPage = 0;

    resultProds = handleSortProds(resultProds);
});

inputsWrapper.addEventListener('click', function(event) {
    const clickEl = event.target;
    if(clickEl.tagName === "INPUT" && clickEl.type === 'checkbox') {
        if(clickEl.className === 'main__input') {
            let dataFilter = clickEl.parentNode.getAttribute('data-filter');
            let div = clickEl.parentNode.querySelector('div');
            if(clickEl.checked) {
                filterObj[dataFilter] = {};
                div.className = 'show__filters';
            } else {
                checkboxesToFalse(div.querySelectorAll('input'));
                delete filterObj[dataFilter];
                const hideFilters = clickEl.parentNode.querySelector('.show__filters');
                if(hideFilters) hideFilters.className = 'hide-filters';
            }
        } else if(clickEl.parentNode.classList.contains('global-filter')) {
            // input global filters
            let nameFilter = clickEl.getAttribute('data-filter'); //red / male
            let groupFilter = clickEl.parentNode.parentNode.getAttribute('data-group'); // colors / gender

            if(clickEl.checked) {
                if(groupFilter in filterObj['globalFilter']) filterObj['globalFilter'][groupFilter].push(nameFilter);
                else filterObj['globalFilter'][groupFilter] = [nameFilter];
            } else {
                filterObj['globalFilter'][groupFilter] = removeFromArr(nameFilter, filterObj['globalFilter'][groupFilter]);
            }
            resultProds = handleFilterProds(filterObj, prods, filterPrice);
        } else {
            // click input/label subfilter
            let dataFilter = clickEl.parentNode.parentNode.parentNode.parentNode.getAttribute('data-filter'); //sneakers /tshirts
            let groupFilter = clickEl.parentNode.parentNode.getAttribute('data-group'); // brand/ size
            let nameFilter = clickEl.getAttribute('data-filter'); //nike/puma
            if(clickEl.checked) {
                if(groupFilter in filterObj[dataFilter]) filterObj[dataFilter][groupFilter].push(nameFilter);
                else filterObj[dataFilter][groupFilter] = [nameFilter];
            } else {
                filterObj[dataFilter][groupFilter] = removeFromArr(nameFilter, filterObj[dataFilter][groupFilter]);
            }
        }
        resultProds = handleFilterProds(filterObj, prods, filterPrice);
    } else if(clickEl.classList.contains('global-filter')) {
        // li global filters
        let input = clickEl.querySelector('input');
        let nameFilter = input.getAttribute('data-filter'); //red / male
        let groupFilter = clickEl.parentNode.getAttribute('data-group'); // colors / gender

        input.checked = !input.checked;

        if(input.checked) {
            if(groupFilter in filterObj['globalFilter']) filterObj['globalFilter'][groupFilter].push(nameFilter);
            else filterObj['globalFilter'][groupFilter] = [nameFilter];
        } else {
            filterObj['globalFilter'][groupFilter] = removeFromArr(nameFilter, filterObj['globalFilter'][groupFilter]);
        }
        resultProds = handleFilterProds(filterObj, prods, filterPrice);
    } else if(clickEl.classList.contains('submain-input')) {
    // click subcategory list
        let input = clickEl.querySelector('input');
            input.checked = !input.checked;

        // when we press the li-subfilters
        let dataFilter = clickEl.parentNode.parentNode.parentNode.getAttribute('data-filter'); //sneakers /tshirts
        let groupFilter = clickEl.parentNode.getAttribute('data-group'); // brand/ size
        let nameFilter = input.getAttribute('data-filter'); //reebok/ adidas

        clickSubFilter(input, dataFilter, groupFilter, nameFilter);
    } else if(clickEl.className === 'category__list') {
        let dataFilter = clickEl.getAttribute('data-filter');
        const checkbox = clickEl.querySelector('input');
        checkbox.checked = !checkbox.checked;
        if(checkbox.checked) {
            filterObj[dataFilter] = {};
            clickEl.querySelector('div').className = 'show__filters';
        } else {
            clickEl.querySelector('div').className = 'hide-filters';
            checkboxesToFalse(clickEl.querySelectorAll('div input'));
            delete filterObj[dataFilter];
        }
        resultProds = handleFilterProds(filterObj, prods, filterPrice);
    // close button
    } else if(clickEl.className === 'close-subfilter') {
        clickEl.parentNode.className = 'hide-filters';
    } else if(clickEl.parentNode.className === 'close-subfilter') {
        clickEl.parentNode.parentNode.className = 'hide-filters';
    }
});

document.querySelector('.show-btn-small-screen').addEventListener('click', (function() {
    var isShowSideFilters = false;
    return function() {
        isShowSideFilters = !isShowSideFilters;
        if(isShowSideFilters) inputsWrapper.style.left = '0';
        else inputsWrapper.removeAttribute('style');
    }})()
);

function handleSortProds(prods) {
    prods = sortProducts(prods);
    createPagination(containerPagination, prods.length);
    showProducts(wrapperProducts, prods);

    return prods;
}

function handleFilterProds(filter, prods, filterPrice) {
    let arrProducts = filterProducts(filter, prods, filterPrice);
    arrProducts = sortProducts(arrProducts);

    createPagination(containerPagination, arrProducts.length);
    showProducts(wrapperProducts, arrProducts);

    return arrProducts;
}

function clickSubFilter(input, dataFilter, groupFilter, nameFilter) {
    if(input.checked) {
        if(groupFilter in filterObj[dataFilter]) filterObj[dataFilter][groupFilter].push(nameFilter);
        else filterObj[dataFilter][groupFilter] = [nameFilter];
    } else {
        filterObj[dataFilter][groupFilter] = removeFromArr(nameFilter, filterObj[dataFilter][groupFilter]);
    }
    resultProds = handleFilterProds(filterObj, prods, filterPrice);
}