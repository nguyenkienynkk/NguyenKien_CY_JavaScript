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
console.log(perfect(28))
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
    {brand: 'Huyndai', model: 'Santafe'},
    {brand: 'Huyndai', model: 'Sonata'},
    {brand: 'Vinfast', model: 'Lux SA'},
    {brand: 'Toyota', model: 'Carmy'},
    {brand: 'Toyota', model: 'Lux A'},
    {brand: 'Toyota', model: 'Vios'}
];
console.log(changeJson(rray));
//Cau 7
const nestedArray = [1, [2, [3, [4, 5,6,7,8,9]]]];
console.log(nestedArray.flat().flat().flat());
//Cau 8
const userDetails = {
    name: "John Doe",
    age: 14,
    verified: {
        status: {
            isVerified: true,
            comment: "Verified"
        },
        date: '2022-02-02'
    }
};
function deepCopy(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    const copy = {};
    for (const key in obj) {
        const value = obj[key];
        copy[key] = deepCopy(value);
    }
    return copy;
}
const cloneObject = deepCopy(userDetails);
console.log("cloned :", cloneObject);

//Cau 9
const matrix = [
    [1,2,3],
    [4,5,6],
    [9,10,11]
]
for (let col = 0; col < matrix[0].length; col++) {
    let columnValues = [];
    for (let row = matrix.length - 1; row >= 0; row--) {
        columnValues.push(matrix[row][col]);
    }
    console.log(columnValues);
}
// Cau 10
let chuoi = "Tập đoàn Hyosung (Hàn Quốc) dự kiến đầu tư thêm 4 tỷ USD, nâng tổng số vốn rót vào Việt Nam lên gấp đôi.\n" +
    "Tại cuộc gặp Thủ tướng Phạm Minh Chính chiều 14/10, ông Cho Hyun-joon , Chủ tịch Tập đoàn Hyosung (Hàn Quốc), khẳng định môi trường đầu tư của Việt Nam rất đáng tin cậy. Ông tin rằng Việt Nam sẽ trở thành trung tâm sản xuất của châu Á.";
function findLongestWord(array) {
    let longestWord = "";
    array.forEach(function(word) {
        if(word.length > longestWord.length)
            longestWord = word;
    });
    return longestWord;
}
let word = findLongestWord(chuoi.split(" "));
console.log(word);