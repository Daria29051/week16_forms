//переменные
const brand = document.getElementById('brand'); //марка авто
const model = document.getElementById('model'); //модель авто



// выбираем модель в зависимости от марки авто
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
        } }
}

