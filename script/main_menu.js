// Create function to select elements
var selectElement = function(element) {
    return document.querySelector(element);
};

//Open and close nav on click
selectElement('.main-menu__menu-icons').addEventListener('click', function() {
    selectElement('nav').classList.toggle('active');
});

let links = document.querySelector('.main-menu__nav-list');
links.addEventListener('click', function(e) {
    if(e.target.getAttribute('data-link')) {
        selectElement('nav').classList.remove('active');
    }
});