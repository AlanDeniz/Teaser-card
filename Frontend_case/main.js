document.addEventListener("DOMContentLoaded", () => {
    fetch('data/teaserData.json')
        .then(response => response.json())
        .then(data => {
            DisplayTeaser(data);
            FontSizeOptions();
        });
});

function FontSizeOptions() {
    fetch('data/config.json')
        .then(response => response.json())
        .then(config => {
            FontSizeDropdown(config.teaserOptions);
            const fontSizeSelector = document.getElementById("font-size-selector");
            const initialFontSize = fontSizeSelector.options[0].value; // initial font size upon loading the page.
            setFontSize(initialFontSize);
        });
}

function DisplayTeaser(data) {
    const teaserContainer = document.getElementById("teaser-container");

    const { article, stamp, fontselector } = data;
    const articleId = article.id;
    const title = article.title;
    const imageUrl = article.image.link.url;
    const rating = article.rating.score;
    const sectionTitle = stamp.section.title;
    const sectionUrl = stamp.section.href.url;
    const fontLabel = fontselector.title;

    let hearts = '';
    for (let i = 0; i < 6; i++) {
        hearts += `
            <img 
                src="assets/heart.svg" 
                class="heart ${i < rating ? '' : 'faded'}" 
                alt="${i < rating ? 'Filled Heart' : 'Faded Heart'}">
        `;
    }

    teaserContainer.innerHTML = `
    
        <div id="font-dropdown">
            <label class="label-title" for="font-size-selector">${fontLabel}</label>
            <select id="font-size-selector"></select>
        </div>
        <div class="teaser-card" id="article-${articleId}">
            <a href="${sectionUrl}" class="teaser-section">${sectionTitle}</a>
            <div class="teaser-rating">${hearts}</div>
            <img src="${imageUrl}" alt="alt tekst beskrivelse" class="teaser-image">
            <p class="teaser-title">${title}</p>
        </div>
    `;
}

function FontSizeDropdown(options) {
    const FontSizeSelector = document.getElementById("font-size-selector");
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.fontSizeOption;
        optionElement.textContent = option.id;
        FontSizeSelector.appendChild(optionElement);
    });

    FontSizeSelector.addEventListener("change", (event) => {
        setFontSize(event.target.value);
    });
}

function setFontSize(fontSize) {
    const teaserCard = document.querySelector(".teaser-title");
    teaserCard.style.fontSize = fontSize;
}
