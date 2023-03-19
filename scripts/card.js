export class Card {
    constructor(dataCat, selectorTemplate, handleCatImage, handleCatTitle, handleLikeCard) {
        this._dataCat = dataCat;
        this._selectorTemplate = selectorTemplate;
        this._handleCatImage = handleCatImage;
        this._handleCatTitle = handleCatTitle;
        this._handleLikeCard = handleLikeCard;
    }

    _getTemplate() { // возвращает содержимое шаблона в виде DOM узла
        return document.querySelector(this._selectorTemplate).content.querySelector('.card');
    
    }

    _updateViewLike() {
        if (this._dataCat.favorite) {
            this.cardLike.classList.add('card__like_active');
        } else {
            this.cardLike.classList.remove('card__like_active');
        }
    }

    _setLikeCat = () => {
        this._dataCat.favorite = !this._dataCat.favorite;
        this._handleLikeCard(this._dataCat, this);
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true); // клонируем полученное содержимое из шаблона
        this.cardTitle = this.element.querySelector('.card__name');
        this.cardImage = this.element.querySelector('.card__image');
        this.cardLike = this.element.querySelector('.card__like');

        this.updateView();

        this.setEventListener()
        return this.element
    }

    getData () {
        return this._dataCat;
    }

    getId() {
        return this._dataCat.id;
    }

    setData(newData) {
        this._dataCat = newData;
    }

    updateView() {
        this.cardTitle.textContent = this._dataCat.name;
        this.cardImage.src = this._dataCat.image;
        this._updateViewLike();
    }

    deleteView() {
        this.element.remove()
        this.element = null;
    }

    setEventListener() {
        this.cardImage.addEventListener('click', () => this._handleCatImage(this._dataCat));
        this.cardTitle.addEventListener('click', () => this._handleCatTitle(this));
        this.cardLike.addEventListener('click', this._setLikeCat);
    }
    
}
