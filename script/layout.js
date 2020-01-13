const inputsWrapper = document.querySelector('.filter-section__filters');

let filterObj = {};

inputsWrapper.addEventListener('click', function(event) {
    const clickEl = event.target;
    if(clickEl.tagName === "INPUT" && clickEl.className === 'main__input') {
        let dataFilter = clickEl.parentNode.getAttribute('data-filter');
        let div = clickEl.parentNode.querySelector('div');
        if(clickEl.checked) {
            filterObj[dataFilter] = [];
            div.className = 'show__filters';
        } else {
            checkboxesToFalse(div.querySelectorAll('input'));
            delete filterObj[dataFilter];
        }
    } else if(clickEl.className === 'category__list') {
        const checkbox = clickEl.querySelector('input');
        checkbox.checked = !checkbox.checked;
        if(checkbox.checked) clickEl.querySelector('div').className = 'show__filters';
    } else if(clickEl.className === 'close-subfilter') {
        clickEl.parentNode.className = '';
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

function checkboxesToFalse(arrCheckboxes) {
    for (let i = 0; i < arrCheckboxes.length; i++) {
        arrCheckboxes[i].checked = false;
    }
}