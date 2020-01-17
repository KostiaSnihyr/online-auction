const inputsWrapper = document.querySelector('.filter-section__filters');
const wrapperProducts = document.querySelector('.filter-section__produts');

let filterObj = { 'globalFilter': {} };

handleFilterProds(filterObj, prods);

inputsWrapper.addEventListener('click', function(event) {
    const clickEl = event.target;
    if(clickEl.tagName === "INPUT") {
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
            handleFilterProds(filterObj, prods);
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
        handleFilterProds(filterObj, prods);
    } else if(clickEl.classList.contains('global-filter')) {
        // li global
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
        handleFilterProds(filterObj, prods);
    } else if(clickEl.classList.contains('submain-input')) {
        // li subcategory
        let input = clickEl.querySelector('input');
            input.checked = !input.checked;

        let dataFilter = clickEl.parentNode.parentNode.parentNode.getAttribute('data-filter'); //sneakers /tshirts
        let groupFilter = clickEl.parentNode.getAttribute('data-group'); // brand/ size
        let nameFilter = input.getAttribute('data-filter'); //reebok/ adidas

        if(input.checked) {
            if(groupFilter in filterObj[dataFilter]) filterObj[dataFilter][groupFilter].push(nameFilter);
            else filterObj[dataFilter][groupFilter] = [nameFilter];
        } else {
            filterObj[dataFilter][groupFilter] = removeFromArr(nameFilter, filterObj[dataFilter][groupFilter]);
        }
        handleFilterProds(filterObj, prods);
        
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
        handleFilterProds(filterObj, prods);
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

function removeFromArr(el, arr) {
    return arr.filter(a => a !== el);
}

function handleFilterProds(filter, prods) {
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
            console.log(prodFilterCategory);
    
            // filter by subcategory
            console.log(subFilters(filter[categoryElement], prodFilterCategory, res));
            res = subFilters(filter[categoryElement], prodFilterCategory, res);
        }
    }

    if(!isFilterWork) {
        for(let prod of prods) {
            res[prod.id] = prod;
        }
    }
    
    prodFilterCategory = [];
    for(let prodId in res) {
        prodFilterCategory.push( res[prodId] ); // res[prodId] - товар
    }
    res = subFilters(filter['globalFilter'], prodFilterCategory, {});

    wrapperProducts.innerHTML = '';
    for(let prodId in res) {
        wrapperProducts.appendChild(createProd(res[prodId]));
    }

    function subFilters(objSubFilters, prodFilterCategory, res) {
        for(let subFilterProp in objSubFilters) {
            let arrSubFilters = objSubFilters[subFilterProp];
            prodFilterCategory = prodFilterCategory.filter(prod => {
                return arrSubFilters.includes(prod[subFilterProp]);
            })
        }

        prodFilterCategory.forEach(prod => res[prod.id] = prod );
        return res;
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