//переменные
const brand = document.getElementById('brand'); //марка авто
const model = document.getElementById('model'); //модель авто
const engine = document.getElementById('engine'); //объем двигателя
const power = document.getElementById('power'); //мощность
const button = document.querySelector('.button'); //кнопка Рассчитать
const errors = document.querySelector('.errors'); //поле вывода ошибок
const condition = document.getElementsByName('condition'); //состояния авто
const owners = document.getElementById('owners'); //количество владельцев


// модели в зависимости от марки авто
let allModels=[];
allModels[0] = ['Logan', 'Duster', 'Sandero', 'Kaptur']; //модели Renault
allModels[1] = ['Corsa', 'Insignia', 'Mokka', 'Astra']; //модели Opel
allModels[2] = ['CX5', 'CX7', 'Model 3', 'Model 6']; //модели Mazda
allModels[3] = ['E-Pace', 'XE', 'I-Pace', 'F-Type']; //модели Jaguar


// ФУНКЦИЯ ВЫВОДА МОДЕЛИ В ЗАВИСИМОСТИ ОТ БРЕНДА
brand.onchange = function() {
// активируем поле модели
    model.disabled = false;
    model.innerHTML="<option value='0'> Выберите модель </option>";

// выводим нужное значение
myModel = brand.value - 1;  
if (myModel > -1){
for (let i = 0; i < allModels[myModel].length; i++) {
model.innerHTML += '<option value="' + (i+1) + '">' + allModels[myModel][i] + '</option>';   
} 
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
    }
else if (conditionOptions[i].value === 'new')
conditionOptions[i].onclick = function() {
    owners.disabled = true;
}}
}


showOwners(); //вызываем функцию