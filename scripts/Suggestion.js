/**
 * Class to create an suggestion instance for the
 * autocomplete list.
 */
class SuggestionItem {

    constructor(suggestionObj) {
        this.id = suggestionObj.id;
        this.isSeries = suggestionObj.t === 'series';
        this.imageURL = suggestionObj.i;
        this.title = suggestionObj.tt; // TODO get language from global scope

        if (this.isSeries) {
            this.episodes = suggestionObj.e;
        }
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
        infoContainerEl.className = 'item_info';

        // Create and append title to container
        const titleEl = document.createElement('div');
        titleEl.className = 'title';
        titleEl.innerText = this.title;
        infoContainerEl.appendChild(titleEl);

        // if item is a series, append episode num to container
        if (this.title === "series") {
            const episodeNumEl = document.createElement('div');
            episodeNumEl.innerText = this.episodes;
            infoContainerEl.appendChild(episodeNumEl);
        }

        return infoContainerEl;
    }

    /**
     * Create list item tag and inner html for item.
     */
    createListItem() {

        // Create list item tag
        const suggestionItemEl = document.createElement('li');
        suggestionItemEl.className = `suggestion_item ${this.id}`;

        // Create item Container div
        const itemContainerEl = document.createElement('div');
        itemContainerEl.className = 'item_container';

        // append image
        itemContainerEl.appendChild(this.createImageEl());

        // append item details
        itemContainerEl.appendChild(this.createItemInfo());

        // append item container
        suggestionItemEl.appendChild(itemContainerEl);

        return suggestionItemEl;
    }

};
