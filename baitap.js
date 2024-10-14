//Cau 2
// -> -> -> -> -> -> -> -> -> -> -> -> ->
const bubbleSortAscending = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
};
//<- <- <- <- <- <- <- <- <- <- <- <- <- <-
const bubbleSortDescending = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] < array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
};

const arr = [10, 2, 3, 2, 5];

console.log("Tăng dần:", bubbleSortAscending([...arr]));
console.log("Giảm dần:", bubbleSortDescending([...arr]));
//Cau 3
const reverseSpecial = (str) => {
    let rawStr = str.split('').reverse().join('');
    return rawStr.replace(/\s+/g, '-');
};

let rawStr = "Hello CY VietNam";
let result = reverseSpecial(rawStr);
console.log(result);
//bai1
const perfect = (number) => {
    let sum = 0;
    for (let i = 0; i <= number / 2; i++) {
        if (number % i === 0)
            sum += i;
    }
    if (number === sum) {
        return number + " là số hoàn hảo";
    }
    return number + " không phải là số hoàn hảo";
}
const soNguyenTo = (number) => {
    if (number < 2)
        return number + " không phải là số nguyên tố";
    for (let i = 2; i <= Math.sqrt(number); i++)
        if (number % i === 0)
            return number + " không phải là số nguyên tố";
    return number + " là số nguyên tố";
}
console.log(perfect(28));
console.log(soNguyenTo(4))
//bai4
const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
console.log(validateEmail("nguyenkienynk@gmail.com"));
//bai 5
const cleanString = (str) => {
    return str.replaceAll(/[@#!{}\[\]()]/g, '')
        .replaceAll(/\s+/g, ' ')
        .trim();
};
const processAndReverseWords = (str) => {
    const cleanedStr = cleanString(str);
    if (cleanedStr === "") return [];
    return cleanedStr.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .reverse();
};
console.log(processAndReverseWords(" Xin c{h}ào #Tech@!Cy(VN)   "));

const averageNumbersInString = (str) => {
    const cleanedStr = cleanString(str);
    const numbers = cleanedStr.split(' ')
        .filter(word => /^\d+$/.test(word))
        .map(Number);

    if (numbers.length === 0) return 0;

    const sum = numbers.reduce((a, b) => a + b, 0);
    return (sum / numbers.length).toFixed(0);
};
console.log(averageNumbersInString(" Xin 20 c{h}ào 60  #Cy30@!Tech(VN)  100 "));
//Cau 6

const changeJson = (arrays) => {
    const resultx = arrays.reduce((acc, item) => {
        const existingGroup = acc.find(group => group[0].brand === item.brand);
        if (existingGroup) {
            existingGroup.push(item);
        } else {
            acc.push([item]);
        }
        return acc;
    }, []);
    return resultx;
}

const rray = [
    { brand: 'Huyndai', model: 'Santafe' },
    { brand: 'Huyndai', model: 'Sonata' },
    { brand: 'Vinfast', model: 'Lux SA' },
    { brand: 'Toyota', model: 'Carmy' },
    { brand: 'Toyota', model: 'Lux A' },
    { brand: 'Toyota', model: 'Vios' }
];
console.log(changeJson(rray));
