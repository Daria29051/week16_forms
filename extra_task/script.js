//ЗАДАЧА 1. Определите, что год находится в интервале от 2000 до 2100 с помощью только регулярного выражения.

function checkYear(string) {
let regexp = /^(20\d\d|2100)$/; 
let stringTested = regexp.test(string);
return stringTested;
}

console.log(checkYear('1999'));
console.log(checkYear('2000'));
console.log(checkYear('2015'));
console.log(checkYear('2101'));



// ЗАДАЧА 2. Удалите одной регуляркой все слова из предложения, содержащие две одинаковые, следующие друг за другом буквы.
function deleteDublicates(string) {
let regexp = /\W*\w*(\w)\1\w*\W*/g;
let stringNew = string.replace(regexp,'');
return stringNew;
}

console.log(deleteDublicates("HELLOO helloo hello world WOORLD woorld"));



// ЗАДАЧА 3. Удалите одной регуляркой все повторяющиеся слова из строки, например для 'ааву ааа ааа ап' должно вернуть 'ааву xxx ап'.

function deleteDublicatedWords(string) {
    let regexp = /\b(\w+)\s+\1/g;
    let stringNew = string.replace(regexp, "$1");
    return stringNew;
}

console.log(deleteDublicatedWords('hello hello world world'));

// ЗАДАЧА 4. Решите предыдущую задачу с учётом того, что слово может повторяться много раз. Например  'ааву ааа ааа ааа ап ааа ааа ааа ап' должно вернуть 'ааву xxx ап'.

function deleteAllDublicatedWords(string) {
    let regexp = /\b(\w+)\b(?:\s+\1\b)+/g;
    let stringNew = string.replace(regexp, "$1");
    return stringNew;
}

console.log(deleteAllDublicatedWords('hello hello hello world world world'));