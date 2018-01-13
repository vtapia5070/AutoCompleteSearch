/**
 * Class to create an suggestion instance for the
 * autocomplete list.
 */

// Global storage for Person suggestions location
const locationStore = {
    'id': 'Indonesia',
    'in': 'India',
    'jp': 'Japan',
    'gb': 'United Kingdom',
    'kr': 'Korea',
    'tw': 'Taiwan',
    'jp': 'Japan'
};

class SuggestionItem {

    constructor(suggestionObj) {

        this.id = suggestionObj.id;
        this.type = suggestionObj.t;
        this.imageURL = suggestionObj.i;

        // For series suggestion types
        this.episodes = suggestionObj.e || 0;

        // For person suggestion types
        this.location = locationStore[suggestionObj.oc] || locationStore['us'];

        // Use selected country language for title if it exists.
        this.title = suggestionObj[language] || suggestionObj.tt;

    }

    /**
     * Create Image tag for thumbnail
     */
    createImageEl() {

        // Append thumbnail to itemContainer
        const thumbnailEl = document.createElement('img');

        thumbnailEl.src = this.imageURL;

        return thumbnailEl;
    }

    /**
     * Create container for Title and series episode num.
     */
    createItemInfo() {

        // Create Container Element
        const infoContainerEl = document.createElement('div');
        infoContainerEl.className = 'item-info';

        // Create and append title to container
        const titleEl = document.createElement('div');
        titleEl.className = 'title';
        titleEl.innerText = this.title;
        infoContainerEl.appendChild(titleEl);

        // create elements based on type.
        switch (this.type) {
            case 'series':
                const episodeNumEl = document.createElement('div');
                episodeNumEl.innerText = `Episodes: ${this.episodes}`;
                infoContainerEl.appendChild(episodeNumEl);
                break;
            case 'person':
                const locationEl = document.createElement('div');
                locationEl.innerText = `Origin: ${this.location}`;
                infoContainerEl.appendChild(locationEl);
        }


        return infoContainerEl;
    }

    /**
     * Create list item tag and inner html for item.
     */
    createListItem() {

        // Create list item tag
        const suggestionItemEl = document.createElement('div');
        suggestionItemEl.className = `suggestion-item ${this.id}`;

        // Create item Container div
        const itemContainerEl = document.createElement('div');
        itemContainerEl.className = 'item-container';

        // append image
        itemContainerEl.appendChild(this.createImageEl());

        // append item details
        itemContainerEl.appendChild(this.createItemInfo());

        // append item container
        suggestionItemEl.appendChild(itemContainerEl);

        return suggestionItemEl;
    }

};
