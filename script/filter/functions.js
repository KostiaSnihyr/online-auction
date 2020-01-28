function filterProducts(filter, prods, filterPrice) {
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
    
    prodFilterCategory = [];
    for(let id in res) prodFilterCategory.push(res[id]);
    // </global filter

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

function sortProducts(prods) {
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