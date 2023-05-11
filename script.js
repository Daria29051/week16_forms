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
const conditionOptions = document.forms['condition-items'].elements['condition']; //находим радио-кнопки состояний авто (новый / бу)
const fuelOptions = document.forms['fuel-items'].elements['fuel']; // радио-кнопки типов топлива





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
for(let i = 0;  i< conditionOptions.length; i++) {
    if (conditionOptions[i].value === 'Подержанный')
    conditionOptions[i].onclick = function() {
        owners.disabled = false;
        age.disabled = false;
    }
else if (conditionOptions[i].value === 'Новый')
conditionOptions[i].onclick = function() {
    owners.disabled = true;
    age.disabled = true;
}}
}


showOwners(); //вызываем функцию

// РАССЧЕТ ИТОГОВОЙ СТОИМОСТИ (КАЛЬКУЛЯТОР)

//map с брендами
let brandStartPrice=new Map();
brandStartPrice.set('Renault', 700000);
brandStartPrice.set('Opel', 1000000);
brandStartPrice.set('Mazda', 1200000);
brandStartPrice.set('Jaguar', 1400000);

// map с моделями
let modelsMultipler=new Map();
modelsMultipler.set('Logan', 1.1);
modelsMultipler.set('Duster', 1.2);
modelsMultipler.set('Sandero', 1.3);
modelsMultipler.set('Kaptur', 1.3);
modelsMultipler.set('Corsa', 1.1);
modelsMultipler.set('Insignia', 1.3);
modelsMultipler.set('Mokka', 1.2);
modelsMultipler.set('Astra', 1.3);
modelsMultipler.set('CX5', 1.3);
modelsMultipler.set('CX7', 1.3);
modelsMultipler.set('Model 3', 1.1);
modelsMultipler.set('Model 6', 1.2);
modelsMultipler.set('E-Pace', 1.2);
modelsMultipler.set('XE', 1.1);
modelsMultipler.set('I-Pace', 1.2);
modelsMultipler.set('F-Type', 1.3);

// map c типом топлива
let fuelMultipler=new Map();
fuelMultipler.set('Бензин', 1.2);
fuelMultipler.set('Дизель', 1.1);
fuelMultipler.set('Электрический', 1.3);

// map c состоянием авто
let conditionMultipler=new Map();
conditionMultipler.set('Новый', 1.2);
conditionMultipler.set('Подержанный', 1.1);


//кол-во владельцев
let ownersMultipler=new Map();
ownersMultipler.set('1', 1.3); //1
ownersMultipler.set('2', 1.2); //2
ownersMultipler.set('3', 1.1); //3 и более

//возраст авто
let ageMultipler=new Map();
ageMultipler.set('1', 1.3); //Менее 3 лет
ageMultipler.set('2', 1.2); // от 3 до  5
ageMultipler.set('3', 1.1); //от 5 до 7
ageMultipler.set('4', 1); //более 7 лет



// коэффициент объема двигателя
const engineMultipliermin = 1.1; // до 2,2 л
const engineMultipliermax = 1.2; //от 2,2 л

// коэффициент мощности
const powerMultipliermin = 1.2; // до 150 лс
const powerMultipliermax = 1.4; // от 150 лс


// ФУНКЦИЯ РАСЧЕТА ИТОГОВОЙ СТОИМОСТИ
// для нового авто
const countPriceNewAuto = () => {
    let finalPrice;
   const finalPriceBeforeTechChars = brandStartPrice.get(brand.value) * modelsMultipler.get(model.value) * fuelMultipler.get(fuelOptions.value) * conditionMultipler.get(conditionOptions.value); 
   if ((engine.value < 2.2) && (power.value < 150)) {
    finalPrice = finalPriceBeforeTechChars * engineMultipliermin * powerMultipliermin;
    return Math.round(finalPrice);
   } else {
   finalPrice = finalPriceBeforeTechChars * engineMultipliermax * powerMultipliermax;
   return Math.round(finalPrice);   
}
}


// для подержанного авто
const countPriceOldAuto = () => {
    let finalPrice;
    const finalPriceBeforeTechChars = brandStartPrice.get(brand.value) * modelsMultipler.get(model.value) * fuelMultipler.get(fuelOptions.value) * conditionMultipler.get(conditionOptions.value) * ownersMultipler.get(owners.options[owners.selectedIndex].value) * ageMultipler.get(age.options[age.selectedIndex].value); 
    if ((engine.value < 2.2) && (power.value < 150)) {
        finalPrice = finalPriceBeforeTechChars * engineMultipliermin * powerMultipliermin;
        return Math.round(finalPrice);
       } else {
       finalPrice = finalPriceBeforeTechChars * engineMultipliermax * powerMultipliermax;
       return Math.round(finalPrice);   
    }
 }


// вешаем обработчик событий
button.addEventListener('click', countPriceNewAuto);
button.addEventListener('click', countPriceOldAuto);


// ВЫВОДИМ ВСЕ ХАРАКТЕРИСТИКИ ВЫБРАННОГО АВТО
const showOutput =() => {
    if (conditionOptions.value ==='Подержанный') {
output.innerHTML = 
`<div class="output__part"> 
    <p class="output__subtitle">Общая информация</p>
     <p> Марка: ${brand.value} </p>
     <p> Модель: ${model.value}</p>
     </div>
     <div class="output__part"> 
     <p class="output__subtitle">Технические характеристики</p>
     <p> Тип топлива: ${fuelOptions.value}</p>
     <p> Объем двигателя л.: ${engine.value}</p>
     <p> Мощность л.с.: ${power.value} </p>
      </div>
      
      <div class="output__part"> 
      <p class="output__subtitle">Состояние</p>
      <p> Состояние авто: ${conditionOptions.value}</p>
      <p> Количество владельцев: ${owners.options[owners.selectedIndex].text}</p>
      <p> Возраст авто: ${age.options[age.selectedIndex].text} </p>
       </div>
       <div class="output__part"> 
      <p class="output__subtitle">Способ оплаты</p>
      <p> Способ оплаты: ${payment.options[payment.selectedIndex].text}</p>
       </div>
       <div class="output__part"> 
       <p class="output__subtitle">Итоговая стоимость</p>
       <p> Стоимость: ${countPriceOldAuto()}</p>
        </div>
       `
} else  {
    output.innerHTML = `<div class="output__part"> 
    <p class="output__subtitle">Общая информация</p>
     <p> Марка: ${brand.value} </p>
     <p> Модель: ${model.value}</p>
     </div>
     <div class="output__part"> 
     <p class="output__subtitle">Технические характеристики</p>
     <p> Тип топлива: ${fuelOptions.value}</p>
     <p> Объем двигателя л.: ${engine.value}</p>
     <p> Мощность л.с.: ${power.value} </p>
      </div>
      <div class="output__part"> 
      <p class="output__subtitle">Состояние</p>
      <p> Состояние авто: ${conditionOptions.value}</p>
      </div>
       <div class="output__part"> 
      <p class="output__subtitle">Способ оплаты</p>
      <p> Способ оплаты: ${payment.options[payment.selectedIndex].text}</p>
       </div>
       <div class="output__part"> 
       <p class="output__subtitle">Итоговая стоимость</p>
       <p> Стоимость: ${countPriceNewAuto()}</p>
        </div>`
}
}

//вешаем обработчик событий
button.addEventListener('click', showOutput)