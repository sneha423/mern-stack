//default behaviour of js is prototypal
//function also behaves as an object in js
function multiply(num) {
  return num * 5;
}
multiply.power = 2;
console.log(multiply(4));
console.log(multiply.power);
console.log(multiply.prototype);

//imporatnace of new keyword
function userScore(username, score) {
  this.username = username;
  this.score = score;
}
userScore.prototype.increment = function () {
  return this.score++;
};
const tea = new userScore("tea", 25);
const coffee = new userScore("coffee", 250);
console.log(tea.increment());

/*

Here's what happens behind the scenes when the new keyword is used:

A new object is created: The new keyword initiates the creation of a new JavaScript object.

A prototype is linked: The newly created object gets linked to the prototype property of the constructor function. This means that it has access to properties and methods defined on the constructor's prototype.

The constructor is called: The constructor function is called with the specified arguments and this is bound to the newly created object. If no explicit return value is specified from the constructor, JavaScript assumes this, the newly created object, to be the intended return value.

The new object is returned: After the constructor function has been called, if it doesn't return a non-primitive value (object, array, function, etc.), the newly created object is returned.

*/

//now prototype in detail
let myName='sneha'
//now we want to make a method truelength which will give the length of string without extra spaces
console.log(myName.truelength);

let hero=['thor','spiderman']
let heroPower={
    thor:'hammer',
    spiderman:'sling',
    getHeroPower:function(name){
        console.log(`${name}'s power is ${this}`);
        
    }

}
Object.prototype.hitesh=function(){
    console.log('hitesh is present in all objects');
    
}//this will join the function to all objects
heroPower.hitesh()
hero.hitesh()
//and if we give a function to array it will not pass over to other object as object is at top tier the function tied to object gets pass on all kinds of objects

//inheritance
const user={
    name:'sneha',
    email:'sneha.gmail'
}
const teacher={
    makeVideo:true
}
const teacherSupport={
    isAvailable:false
}
const TASupport={
    makeAssignment:'js assignment',
    fulltime:true,
    __proto__:teacherSupport
}
teacher.__proto__=user

//modern syntax
Object.setPrototypeOf(teacherSupport,teacher)

let anotherUser='sneha      '
String.prototype.truelength=function(){
    // console.log(`${this.name}`);
    console.log(`${this}`);
    
    console.log(`true length is ${this.trim().length}`);
    
}
anotherUser.truelength()
'scasc'.truelength()