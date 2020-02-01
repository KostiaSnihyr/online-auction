const form = document.querySelector('.js-form');
const arrInputs = form.querySelectorAll('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(storage.logged(arrInputs[0].value, arrInputs[1].value)) {
        alert('Sucсessfull Sign In!');
        location.href = 'add.html';
    } else if(storage.isUserExist(arrInputs[0].value)) {
        alert('Failed Password!');
        arrInputs[1].value = '';
        arrInputs[1].focus();
    } else {
        storage.addUser(arrInputs[0].value, arrInputs[1].value);
        alert('Sucсessfull Login!');
        location.href = 'index.html#lots';
    }
});