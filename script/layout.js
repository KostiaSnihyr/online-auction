const inputsWrapper = document.querySelector('.filter-section__filters');

inputsWrapper.addEventListener('click', function(event) {
    const clickEl = event.target;
    if(clickEl.tagName === "INPUT" && clickEl.className === 'main__input') {
        if(clickEl.checked) {
            clickEl.parentNode.querySelector('div').className = 'show__filters';
        }
    } else if(clickEl.className === 'category__list') {
        const checkbox = clickEl.querySelector('input');
        checkbox.checked = !checkbox.checked;
        if(checkbox.checked) clickEl.querySelector('div').className = 'show__filters';
    } else if(clickEl.className === 'close-subfilter') {
        clickEl.parentNode.className = '';
    }
});