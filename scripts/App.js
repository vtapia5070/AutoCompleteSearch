/**
 * This file auto completes search.
 */

let inputEl;
let selectEl;
let suggestionsContainerEl;
let language;
let languageStore;

const init = () => {

    addAssignments();
    addEventListeners();

};

/**
 * Add assignments to global declarations.
 */
const addAssignments = () => {

    inputEl = document.querySelector('.search-input');
    selectEl = document.querySelector('.country-select');
    suggestionsContainerEl = document.querySelector('.suggestions');

    // for seriese suggestions if user picks a language,
    // default to english.
    languageStore = {
        'kr': 'ko', // korean
        'jp': 'tj', // Japanese
        'mx': 'te', // spanish
        'fr': 'tf', // french
        'br': 'pt', // potugese
        'us': 'tt', // US
        'cn': 'tzt' // 'China'

    };

    // default language
    language = languageStore['us'];

};



const createSuggestionsList = (list) => {

    // Empty DOM
    suggestionsContainerEl.innerHTML = '';

    // Don't render anything if user empties input.
    if (list === null) {
        return;
    }

    // Notify user of failed suggestions.
    if (list.length <= 0) {

        const headerNoticeEl = document.createElement('h1');
        headerNoticeEl.className = 'notice';
        headerNoticeEl.innerText = 'We couldn\'t find any items related to your search, try another item!';
        suggestionsContainerEl.appendChild(headerNoticeEl);

        return;
    }

    const listContainerEl = document.createElement('div');

    listContainerEl.className = 'suggestions-list';

    list.forEach((item) => {

        const suggestion = new SuggestionItem(item);

        listContainerEl.appendChild(suggestion.createListItem());

    });

    suggestionsContainerEl.appendChild(listContainerEl);

};


/**
 * Request search suggestions from endpoint when user types.
 * @param {object} e - event
 */
const getSearchSuggestions = (e) => {
    if (e.target.value === '') {

        createSuggestionsList(null);
        return;
    }

    const searchStr = `c=${e.target.value}`;
    const timestamp = Date.now() / 1000 | 0;
    const params = `?${searchStr}&per_page=5&with_people=true&app=100266a&t=${timestamp}`;
    const endpoint = `https://api.viki.io/v4/search.json${params}`;

    fetch(endpoint).then((resp) => {

        if (resp.ok) {
            return resp.json();
        }

        return Promise.reject('something went wrong!');

    }).then((data) => {

        createSuggestionsList(data);

    });

};

/**
 * Set Global language for suggestions.
 */
const setLanguage = (e) => {
    language = languageStore[e.target.value];
};

const addEventListeners = () => {

    inputEl.onkeyup = getSearchSuggestions;
    selectEl.onchange = setLanguage;

};

init();