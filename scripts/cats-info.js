import { generateRating, plural } from './utils.js';

export class CatsInfo {
    constructor(selectorTemplate, handleEditCat, handleLikeCat, handleDeleteCat) {
        this._selectorTemplate = selectorTemplate;
        this._handleEditCat = handleEditCat;
        this._handleLikeCat = handleLikeCat;
        this._handleDeleteCat = handleDeleteCat;
        this._data = {};
    }

    _getTemplate() { // возвращает содержимое шаблона в виде DOM узла
        return document.querySelector(this._selectorTemplate).content.children[0];
    
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true);

        this.buttonEdited = this.element.querySelector('.cat-info__edited');
        this.buttonSaved = this.element.querySelector('.cat-info__saved');
        this.buttonLiked = this.element.querySelector('.cat-info__favourite');
        this.buttonDeleted = this.element.querySelector('.cat-info__deleted');
        this.catImage = this.element.querySelector('.cat-info__image'); 
        this.catId = this.element.querySelector('.cat-info__id'); 
        this.catName = this.element.querySelector('.cat-info__name'); 
        this.catRate = this.element.querySelector('.cat-info__rate'); 
        this.catAge = this.element.querySelector('.cat-info__age-val'); 
        this.catAgeText = this.element.querySelector('.cat-info__age-text'); 
        this.catDesc = this.element.querySelector('.cat-info__desc'); 

        console.log(this.catImage);

        this.setEventListener();
        return this.element;
    }

    _updateViewLike() {
        if (this._data.favorite) {
            this.buttonLiked.classList.add('cat-info__favourite_active');
        } else {
            this.buttonLiked.classList.remove('cat-info__favourite_active');
        }
    }

    setData(cardInstance) {
        this._cardInstance = cardInstance;
        this._data = this._cardInstance.getData();
        this.catDesc.textContent = this._data.description;
        this.catName.textContent = this._data.name;
        this.catAge.textContent = this._data.age;
        this.catId.textContent = this._data.id;
        this.catAgeText.textContent = plural(this._data.age, ["год","года","лет"]);
        this.catRate.innerHTML = generateRating(this._data.rate);
        this.catImage.src = this._data.image;       

        this._updateViewLike();
    }

    _setLikeCat = () => {
        this._data.favorite = !this._data.favorite;
        this._updateViewLike();
        this._handleLikeCat(this._data, this._cardInstance);
    }

    _toggleContentEditable = () => {
        this.buttonEdited.classList.toggle('cat-info__edited_hidden');
        this.buttonSaved.classList.toggle('cat-info__saved_hidden');
        this.catDesc.contentEditable = !this.catDesc.isContentEditable;
        this.catName.contentEditable = !this.catName.isContentEditable;
        this.catAge.contentEditable = !this.catAge.isContentEditable;

    }

    _savedDataCats = () => {
        this._toggleContentEditable();
        this._data.name = this.catName.textContent;
        this._data.age = Number(this.catAge.textContent);
        this._data.description = this.catDesc.textContent;
        
        this._handleEditCat(this._cardInstance, this._data)
    }

    setEventListener() {
        this.buttonDeleted.addEventListener('click', () => this._handleDeleteCat(this._cardInstance));
        this.buttonEdited.addEventListener('click', this._toggleContentEditable);
        this.buttonSaved.addEventListener('click', this._savedDataCats);
        this.buttonLiked.addEventListener('click', this._setLikeCat);
    }
}