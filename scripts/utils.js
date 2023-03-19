export function serializeForm(elements) { //формирует данные из формы в объект для отправки на сервер
    const formData = {};
   
    elements.forEach(input => {
        if (input.type === 'submit') return

        if (input.type !== 'checkbox') {
                formData[input.name] = input.value;
        }
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        }
    });
    return formData
}

export function setDataRefrash(minutes, key) { // функция ставит интервал обновления локал-стоража
    const setTime = new Date(new Date().getTime() + minutes * 60000)
    localStorage.setItem(key, setTime);
    // ?? return setTime;
}

export function plural(number, titles) {  
    const cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}
//<i class="fa-solid fa-star"></i>
//<i class="fa-solid fa-star-half-stroke"></i>
//<i class="fa-regular fa-star"></i>

export function generateRating(rate) {
    const rateElements = [];
    for(let index = 0; index < 10; index++) {
        if (index < rate && rate % 1 === 0) {
            rateElements.push('<i class="fa-solid fa-star"></i>')
        } 
        else if (index < Math.floor(rate) && rate % 1 !== 0) {
            rateElements.push('<i class="fa-solid fa-star"></i>')
        }
        else if (index === Math.floor(rate) && rate % 1 !== 0) {
            rateElements.push('<i class="fa-solid fa-star-half-stroke">')
        }   else {
            rateElements.push('<i class="fa-regular fa-star"></i>')
        }
    }
    return rateElements.join('')
}
