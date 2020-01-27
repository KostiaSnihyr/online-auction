const inputsWrapper = document.querySelector('.filter-section__filters');
const wrapperProducts = document.querySelector('.filter-section__produts');

const selectSort = document.querySelector('.js-select-sort');
const optionsSort = selectSort.querySelectorAll('option');

const inputsPrice = inputsWrapper.querySelectorAll('.js-price');

const containerPagination = document.querySelector('.js-pagination');
const selectPagination = document.querySelector('.js-select-pagination');
const optionsPagination = selectPagination.querySelectorAll('option');

let filterObj = { 'globalFilter': {} };
let filterPrice = {};
let sortPaginationObj = { sortProp: '', k: '', onPage: 2, curPage: 0 };
let resultProds = [];