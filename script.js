/**
 * This file auto completes search.
 */

let inputEl;
let suggestionsContainerEl;

const init = () => {

    addAssignments();
    addEventListeners();

};

/**
 * Add assignments to global declarations.
 */
const addAssignments = () => {

    inputEl = document.querySelector('.searchInput');
    suggestionsContainerEl = document.querySelector('.suggestions');

};


const createSuggestionItem = (suggestion) => {

    const suggestionItemEl = document.createElement('li');
    suggestionItemEl.className = `suggestion_item ${suggestion.id}`;

    const itemContainerEl = document.createElement('div');
    itemContainerEl.className = 'item_container';

    const thumbnailEl = document.createElement('img');
    thumbnailEl.src = suggestion.i;

    const titleEl = document.createElement('div');
    titleEl.className = 'title';
    titleEl.innerText = suggestion.tt;

    // use key for reference to items so we don't have to rerender dom
    suggestionItemEl.appendChild(thumbnailEl);
    suggestionItemEl.appendChild(titleEl);

    return suggestionItemEl;
};

const createSuggestionsList = (list) => {

    const listContainerEl = document.createElement('ul');

    listContainerEl.className = 'suggestions__list';

    list.forEach((item) => {
        listContainerEl.appendChild(createSuggestionItem(item));
    });

    suggestionsContainerEl.innerHTML = ``;
    suggestionsContainerEl.appendChild(listContainerEl);

};

/**
 * Request search suggestions.
 * @param {object} e - event
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