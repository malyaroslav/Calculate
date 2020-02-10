let liniya = document.getElementsByTagName('input');
let del = document.getElementsByClassName('del');
let test = document.getElementById('test');
let mainUl = document.getElementById('mainUl');
let plus = document.getElementById('plus');

let nettoInputItog = document.getElementById('nettos');
let bruttoInputItog = document.getElementById('bruttos');
let taxInputItog = document.getElementById('taxItog');


let nettoItog = document.getElementsByClassName('fieldNetto');
let bruttoItog = document.getElementsByClassName('fieldBrutto');
let taxItog = document.getElementsByClassName('fieldTax');

let tax = 0;
let reg = new RegExp("[0-9]+([\.,][0-9]+)?");

function add() {
    let liniesObj = {
        service: `<input type="text" id="service">`,
        obj: `<input type="number" id="object">`,
        netto: `<input type="number" step="any" id="netto"  class="fieldNetto" data-name="fieldNetto" pattern="[0-9]+([\\.][0-9]+)?"/>`,
        tax: ` <select name="" id="tax" class="fieldTax" data-name="tax"><option value="0">0</option><option value="7">7</option><option value="19">19</option></select>`,
        brutto: `<input type="number" id="brutto" step="any" class="fieldBrutto" value="0" data-name="brutto" pattern="[0-9]+([\\.,][0-9]+)?"/>`,
        basket: `<button class="del"></button>`
    };
    let pole = `<li class="fieldCalculate">${liniesObj.service} ${liniesObj.obj} ${liniesObj.netto} ${liniesObj.tax} ${liniesObj.brutto} ${liniesObj.basket}</li>`;
    mainUl.insertAdjacentHTML('beforeend', pole);
    let it;
    [...mainUl.children].forEach(elem => {
        elem.oninput = function (e) {
            console.log(e.target);
            if (e.target.dataset.name == "fieldNetto") {
                it = e.target.value;
                [...e.target.parentNode.children].forEach((elem) => {
                    if (elem.dataset.name == "brutto") {

                        elem.value = (+(it) + +((it * tax) / 100)).toFixed(2);
                    }
                    if (elem.dataset.name == "tax") {
                        tax = +(elem.value);
                        elem.value = +tax;
                    }
                });
                console.log(it);
            }
            if (e.target.dataset.name == "brutto") {
                it = e.target.value;
                [...e.target.parentNode.children].forEach((elem) => {
                    if (elem.dataset.name == "fieldNetto") {
                        elem.value = (+(it) - +((it * tax) / 100)).toFixed(2);
                    }
                    if (elem.dataset.name == "tax") {
                        tax = +(elem.value);
                        elem.value = (+tax);
                    }
                });
            }
            if (e.target.dataset.name == "tax") {
                tax = e.target.value;
                [...e.target.parentNode.children].forEach((elem) => {
                    if (elem.dataset.name == "fieldNetto") {
                        tax = +(elem.value);
                        elem.value = +(it);
                    }
                    if (elem.dataset.name == "brutto") {
                        tax = +(elem.value);
                        elem.value = (+(it) + +((it * tax) / 100)).toFixed(2);
                    }
                });
            }
            nettoInputItog.setAttribute('value', itog(nettoItog));
            bruttoInputItog.setAttribute('value', itog(bruttoItog));
            taxInputItog.setAttribute('value', taxItogs());
        }
    });
    deletes();
}
function deletes(it) {
    for (let i = 0; i < del.length; i++) {
        del[i].addEventListener('click', (e) => {
            [...e.target.parentElement.children].forEach((el)=>{
                if(el.dataset.name == 'fieldNetto'){
                    el.value = 0;
                }
            });
            e.target.parentElement.remove();
        })
    }
}
function itog(val) {
    let massiv = [];
    [...val].forEach(e => {
        massiv.push(e.value)
    });
    return massiv.reduce((a, b) => {
        return (+a + +b).toFixed(2)
    });
}
function taxItogs() {
    let a = nettoInputItog.getAttribute('value'), b = bruttoInputItog.getAttribute('value');
    return (+b - +a).toFixed(2);
}
plus.addEventListener('click', add);


