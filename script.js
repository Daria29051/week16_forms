//переменные
const brand = document.getElementById('brand'); //марка авто
const model = document.getElementById('model'); //модель авто
const engine = document.getElementById('engine'); //объем двигателя
const power = document.getElementById('power'); //мощность
const button = document.querySelector('.button'); //кнопка Рассчитать
const errors = document.querySelector('.errors'); //поле вывода ошибок
const condition = document.getElementsByName('condition'); //состояния авто
const owners = document.getElementById('owners'); //количество владельцев
const age = document.getElementById('age'); //возраст авто
const payment = document.getElementById('payment'); //способ оплаты
const output = document.querySelector('.output'); //поле вывода


// модели в зависимости от марки авто
// let allModels=[];
// allModels[0] = ['Logan', 'Duster', 'Sandero', 'Kaptur']; //модели Renault
// allModels[1] = ['Corsa', 'Insignia', 'Mokka', 'Astra']; //модели Opel
// allModels[2] = ['CX5', 'CX7', 'Model 3', 'Model 6']; //модели Mazda
// allModels[3] = ['E-Pace', 'XE', 'I-Pace', 'F-Type']; //модели Jaguar

let brandsAndModels=new Map();
brandsAndModels.set('Renault', 'Logan,Duster,Sandero,Kaptur');
brandsAndModels.set('Opel', 'Corsa,Insignia,Mokka,Astra');
brandsAndModels.set('Mazda', 'CX5,CX7,Model 3,Model 6');
brandsAndModels.set('Jaguar', 'E-Pace,XE,I-Pace,F-Type');

// ФУНКЦИЯ ВЫВОДА МОДЕЛИ В ЗАВИСИМОСТИ ОТ БРЕНДА
brand.onchange = function() {
// активируем поле модели
    model.disabled = false;
    model.innerHTML="<option value='0'> Выберите модель </option>";

// выводим нужное значение
let models = brandsAndModels.get(brand.value).split(',');

for (let item of models) {
model.innerHTML += `<option value="${item}">${item}</option>`;   
} 
}

// ФУНКЦИЯ ВЫВОДА ОШИБОК ЗАПОЛЕНЕНИЯ ФОРМЫ
let errorsArray = [];
const checkValidity = () => {
    //проверка мощности
if ((engine.value < 1.1)|| (engine.value > 3.5)) {
    errorsArray.push('<p>Введите объём двигателя от 1.8л до 3.5л</p>');
} 
//проверка объема двигателя
if (power.value < 120) {
  errorsArray.push('<p>Минимальная мощность автомобиля : 120 л.с.</p>');
} 
errors.innerHTML = errorsArray.join('\n');
}


button.addEventListener('click', checkValidity, {once : true}); //вешаем обработчик событий (проверка ошибок заполнения) на кнопку Рассчитать




// ФУНКЦИЯ АКТИВАЦИИ ПОЛЯ С КОЛ-ВОМ ВЛАДЕЛЬЦЕВ
const showOwners = () => {
let conditionOptions = document.forms['condition-items'].elements['condition']; //находим радио-кнопки состояний авто
for(let i = 0;  i< conditionOptions.length; i++) {

    if (conditionOptions[i].value === 'old')
    conditionOptions[i].onclick = function() {
        owners.disabled = false;
        age.disabled = false;
    }
else if (conditionOptions[i].value === 'new')
conditionOptions[i].onclick = function() {
    owners.disabled = true;
    age.disabled = true;
}}
}


showOwners(); //вызываем функцию

// ВЫВОДИМ ВСЕ ХАРАКТЕРИСТИКИ ВЫБРАННОГО АВТО
const showOutput =() => {
output.innerHTML = 
`<h2 class="output__titile"> Ваш автомобиль </h2>
    <div class="output__part">
     <p> Марка: ${brand.value} </p>
     <p> Модель: ${model.value}</p>
     </div>`
}

button.addEventListener('click', showOutput)