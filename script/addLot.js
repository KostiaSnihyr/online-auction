const form = document.querySelector('.js-form'),
      selectCategory = form.querySelector('.js-category'),
      optionsCategory = selectCategory.querySelectorAll('option'),
      wrSubSelects = form.querySelector('.js-sub_selects');

const options = {
    'sneakers': {
        'brand': ['nike', 'puma', 'adidas', 'reebok'],
        'size': ['41', '42', '43', '44']
    },
    't-shirts': {
        'brand': ['tommy hilfiger', 'gucci', 'lacoste', 'nike'],
        'size': ['s', 'm', 'l', 'xl']
    },
    'caps': {
        'brand': ["bailey", "47 brand", "adidas", "alpinestars", "bacpakr"],
        'shape': ["snapback", "flexfit", "kids", "caps"]
    },
    'bags': {
        'brand': ["lacoste", "lv", "adidas", "reebok"],
        'size': ["small", "medium", "large"],
        'occasion': ["work", "travel", "day to night", "party"],
        'material': ["canvas", "hunter leather", "classic leather"]
    }
};


selectCategory.addEventListener('change', function(e) {
    const category = optionsCategory[this.selectedIndex].value;
    createSubFilters(wrSubSelects, options[ category ]);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const arrSelects = this.querySelectorAll('select'),
          arrInputs = this.querySelectorAll('input');
    let res = [],
        options;

    for (let i = 0; i < arrInputs.length; i++) {
        res.push({
            value: arrInputs[i].value,
            name: arrInputs[i].getAttribute('name')
        })
    }

    for(let i = 0; i < arrSelects.length; i++) {
        options = arrSelects[i].querySelectorAll('option');
        res.push({
            value: options[arrSelects[i].selectedIndex].value,
            name: arrSelects[i].getAttribute('name')
        })
    }

    console.log(res);
});


function createSubFilters(container, objSelects) {
    container.innerHTML = '';
    for(let name in objSelects) { // name => brand/size
        container.appendChild( createSelect(name, objSelects[name]) );
    }
}

function createSelect(name, arr) {
    const container = document.createElement('select');
    container.setAttribute('name', name);
    container.setAttribute('required', 'required');
    
    container.appendChild(createOption('Choose ' + name, true));
    for (let i = 0; i < arr.length; i++) {
        container.appendChild(createOption(arr[i]));
    }
    return container;
}

function createOption(val, isFirst) {
    const option = document.createElement('option');
    if(isFirst) {
        option.setAttribute('disabled', 'disabled');
        option.setAttribute('selected', 'selected');
    }
    option.setAttribute('value', val);
    option.innerText = val;

    return option;
}