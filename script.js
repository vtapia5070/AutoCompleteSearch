/**
 * This file auto completes search.
 */

let inputEl;

const init = () => {

    addAssignments();
    addEventListeners();

};

/**
 * Add assignments to global declarations.
 */
const addAssignments = () => {

    inputEl = document.querySelector('.searchInput');

};

const suggestionStore = {};

const createSuggestionItem = (suggestion) => {

    const suggestionItemEl = document.createElement('li');

    // use key for reference to items so we don't have to rerender dom
    suggestionItemEl.className = `suggestionItem ${suggestion.id}`;
    suggestionItemEl.innerText = suggestion.tt;

    return suggestionItemEl;
};

const createSuggestionsList = (list) => {
    const newStore = {};
    const listContainerEl = document.createElement('ul');
    listContainerEl.className = 'suggestions__list';

    list.forEach((item) => {
        if (suggestionStore[item.id] === undefined) {
            suggestionStore[item.id] = item;
            listContainerEl.appendChild(createSuggestionItem(item));
        }
    });

    document.body.appendChild(listContainerEl);

};

/**
 * Request search suggestions.
 * @param {*} e - event
 */
const getSearchSuggestions = (e) => {

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

    console.log('searching!', `${ endpoint }${ params }`);

};

const addEventListeners = () => {

    inputEl.onkeyup = getSearchSuggestions;

};

init();

/**
 *
 * Viki has a simple autocomplete api. Example:
https://api.viki.io/v4/search.json?c=boys&per_page=5&with_people=true&app=100266a&t=1440586215
With the following params:
c​: The search string
per_page​: number of results to return, keep the value at “5”
with_people​: Flag to indicate search result to include celebrity items
app​: ID of application making the call. Keep the value as “100266a“
t​: Timestamp
 */