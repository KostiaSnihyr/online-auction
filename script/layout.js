const inputsWrapper = document.querySelector('.filter-section__filters');
const wrapperProducts = document.querySelector('.filter-section__produts');

const selectSort = document.querySelector('.js-select-sort');
const optionsSort = selectSort.querySelectorAll('option');

const inputsPrice = inputsWrapper.querySelectorAll('.js-price');

const containerPagination = document.querySelector('.js-pagination');
const selectPagination = document.querySelector('.js-select-pagination');
const optionsPagination = selectPagination.querySelectorAll('option');

let filterObj = { 'globalFilter': {} };
let filterPrice = {};
let sortPaginationObj = { sortProp: '', k: '', onPage: 2, curPage: 0 };
let resultProds = [];

// <price
for(let input of inputsPrice) {
    input.addEventListener('input', function() {
        let typeOfPrice = this.getAttribute('data-filter'); //min / max
        let price = parseFloat(this.value);

        if(!isNaN(price)) filterPrice[typeOfPrice] = price; 
        else delete filterPrice[typeOfPrice];
        resultProds = handleFilterProds(filterObj, prods, filterPrice);
        // createPagination(containerPagination, resultProds.length);
    });
}
// </price

resultProds = handleFilterProds(filterObj, prods, filterPrice);

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

function checkboxesToFalse(arrCheckboxes) {
    for (let i = 0; i < arrCheckboxes.length; i++) {
        arrCheckboxes[i].checked = false;
    }
}

document.querySelector('.show-btn-small-screen').addEventListener('click', (function() {
    var isShowSideFilters = false;
    return function() {
        isShowSideFilters = !isShowSideFilters;
        if(isShowSideFilters) inputsWrapper.style.left = '0';
        else inputsWrapper.removeAttribute('style');
    }})()
);

function handleSortProds(prods) {
    prods = handleSort(prods);
    createPagination(containerPagination, prods.length);
    showProducts(wrapperProducts, prods);

    return prods;
}

function removeFromArr(el, arr) {
    return arr.filter(a => a !== el);
}

function handleFilterProds(filter, prods, filterPrice) {
    let arrProducts = handleFilters(filter, prods, filterPrice);
    arrProducts = handleSort(arrProducts);

    createPagination(containerPagination, arrProducts.length);
    showProducts(wrapperProducts, arrProducts);

    return arrProducts;
}

function handleFilters(filter, prods, filterPrice) {
    let res = {};
    let prodFilterCategory;
    let isFilterWork = false;

    // filter by category
    for(let categoryElement in filter) {
        if(categoryElement !== 'globalFilter') {
            isFilterWork = true;
            prodFilterCategory = prods.filter(prod => {
                return categoryElement === prod.category;
            });
    
            // filter by subcategory
            res = subFilters(filter[categoryElement], prodFilterCategory, res);
        }
    }

    if(!isFilterWork) {
        for(let prod of prods) {
            res[prod.id] = prod;
        }
    }

    // <price filter
    for(let typePrice in filterPrice) {
        const price = filterPrice[typePrice];
        
        let tempRes = {}; // save here filtered goods by price
        if(typePrice === 'min') {
            for(let id in res) {
                if(res[id].price >= price) {
                    tempRes[id] = res[id];
                }
            }
        } else {
            for(let id in res) {
                if(res[id].price <= price) {
                    tempRes[id] = res[id];
                }
            }
        }

        res = tempRes;
    }
    // </price filter

    // <global filter
    prodFilterCategory = [];
    for(let prodId in res) {
        prodFilterCategory.push( res[prodId] ); // res[prodId] - item
    }
    res = subFilters(filter['globalFilter'], prodFilterCategory, {});
    // </global filter
    
    // <order filter
    prodFilterCategory = [];
    for(let id in res) prodFilterCategory.push(res[id]);

    return prodFilterCategory;

    function subFilters(objSubFilters, prodFilterCategory, res) {
        for(let subFilterProp in objSubFilters) {
            let arrSubFilters = objSubFilters[subFilterProp];
            if(arrSubFilters.length !== 0) {
                prodFilterCategory = prodFilterCategory.filter(prod => {
                    return arrSubFilters.includes(prod[subFilterProp]);
                })
            }
        }

        prodFilterCategory.forEach(prod => res[prod.id] = prod );
        return res;
    }
}

function handleSort(prods) {
    if(sortPaginationObj.sortProp) prods.sort( (a, b) => +sortPaginationObj.k * (+a[ sortPaginationObj.sortProp ] - +b[ sortPaginationObj.sortProp ]) );
    //return sorted array of objects by price and rank
    return prods;
}

function showProducts(containerProducts, prods) {
    containerProducts.innerHTML = '';

    const maxProduct = prods.length;
    let maxOnCurPage = sortPaginationObj.onPage * (sortPaginationObj.curPage + 1);
    maxOnCurPage = maxOnCurPage === 0 ? maxProduct : maxOnCurPage;

    for(let i = sortPaginationObj.onPage * sortPaginationObj.curPage; i < maxProduct && i < maxOnCurPage; i++) {
        containerProducts.appendChild(createProd( prods[i] ));
    }
}

function createProd(prod) {
    const prodWrapper = document.createElement('div');
    const img = document.createElement('img');
    const description = document.createElement('p');
    const title = document.createElement('h3');

    prodWrapper.className = 'product';
    img.className = 'product-img';

    img.setAttribute('src', prod.image);
    description.innerText = `price: ${prod.price}, color: ${prod.color}`;
    if('size' in prod) {
        description.innerText += `, size ${prod.size}`;
    }
    title.innerText = prod.title;

    prodWrapper.appendChild(img);
    prodWrapper.appendChild(title);
    prodWrapper.appendChild(description);

    return prodWrapper;
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

function createPagination(container, qtyProds) {
    let link;
    qtyProds = Math.ceil(qtyProds / sortPaginationObj.onPage); // how many pages
    sortPaginationObj.curPage = 0;

    container.innerHTML = '';
    for(let i = 0; i < qtyProds; i++) {
        link = document.createElement('button');
        link.innerText = i + 1;
        link.setAttribute('data-page', i);
        if(i === 0) link.className = 'active';

        container.appendChild(link);
    }
}