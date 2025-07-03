//default behaviour of js is prototypal
//function also behaves as an object in js
function multiply(num){
    return num*5
}
multiply.power=2
console.log(multiply(4));
console.log(multiply.power);
console.log(multiply.prototype);
