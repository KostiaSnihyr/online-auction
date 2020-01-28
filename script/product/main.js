let curProd = location.href.split('?id=')[1]; // product id
// ['file:///C:/Users/kossd/Desktop/filter%20style/product.html', '14']

for (let prod of prods) {
    if(prod.id === curProd) {
        curProd = prod;
        break;
    }
}


document.body.appendChild( createProd(curProd) );