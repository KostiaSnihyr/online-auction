let curProd = location.href.split('?id=')[1]; // product id
// ['file:///C:/Users/kossd/Desktop/filter%20style/product.html', '14']

for (let i = 0; i < prods.length; i++) {
    if(prods[i].id === curProd) {
        curProd = prods[i];
        break;
    }
}


document.body.appendChild( createProd(curProd) );