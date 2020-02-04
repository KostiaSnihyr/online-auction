;(function() {
    const slidesGalery = document.querySelector('.js-slider__gallery'),
          slides = [],
          controls = document.querySelector('.js-slider__controls');
    let slide;

    for (let i = 0; i < prods.length; i++) {
        const prod = prods[i];
        if(prod.image.indexOf('.png ') !== -1) {
            slide = createSlide(prod, slides.length === 0);
            slides.push( slide );
            slidesGalery.appendChild( slide );
        }
    }
    createControls(controls, slides.length);

    controls.addEventListener('click', function(e) {
        const clickEl = e.target;
        if(clickEl.tagName === 'A') {
            e.preventDefault();
            removeActive('slider__controls-item_active');
            clickEl.className = 'slider__controls-item_active';
            removeActive('slider__slide_active');
            slides[ clickEl.getAttribute('data-slide') ].classList.add('slider__slide_active');
        }
    })

    function removeActive(classActive) {
        const curActive = document.querySelector('.' + classActive);
        if(curActive) curActive.classList.remove(classActive);
        return !!curActive;
    }
    function createControls(container, qty) {
        let point;
        for(let i = 0; i < qty; i++) {
            point = document.createElement('a');
            point.setAttribute('data-slide', i);
            if(i === 0) point.className = 'slider__controls-item_active';
            container.appendChild(point);
        }
    }
    function createSlide(prod, isActive) {
        const slideWrapper = document.createElement('div');
        const img = document.createElement('img');
        const content = document.createElement('div');
        const description = document.createElement('p');
        const title = document.createElement('h3');
        const link = document.createElement('a');

        slideWrapper.className = 'slider__slide';
        if(isActive) slideWrapper.className += ' slider__slide_active';

        img.setAttribute('src', prod.image);
        img.setAttribute('alt', 'slide image');
        link.setAttribute('href', 'product.html?id=' + prod.id);

        description.innerHTML = 'price: ' + prod.price + '<br>' + 'color: ' + prod.color + '<br>' + 'rank: ' + prod.rank;
        if('size' in prod) {
            description.innerHTML += ' <br> size ' + prod.size;
        }
        title.innerText = prod.title;
        link.innerText = 'сделать ставку';

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(link);

        slideWrapper.appendChild(content);
        slideWrapper.appendChild(img);

        return slideWrapper;
    }
})();