//object oriented programming
//js does not have classes directly
//why we use OOP: to write code in more systematic way
//Parts of OOP:object literal,constructor function,prototype,classes,instances(new,this)
//4 pillars:abstraction(fetch),encapsulation,inheritance(prototype),polymorphism

//a literal object:
const user = {
  username: "sneha",
  loginCount: 5,

  getUserDetails: function () {
    // console.log('got user details from web');
    //to access data we use this function
    console.log(`username: ${this.username}`);
    console.log(this);
    
  },
};
console.log(user.loginCount);
console.log(user.getUserDetails());
console.log(this);//this first comes as an empty parantheses ass it is in global scope but in browser we have some global this output


//construcyor function allows us to make multiple instances from one literal
// constructor function: new()

function users(username,password){
    this.username=username
    this.password=password
    return this
}
// const userOne=users('sneha',1235)
// console.log(userOne);
// const userTwo=users('amita',6966)
// console.log(userTwo);
// console.log(userOne);//values have been overwritten
//that's why we use the 'new' keyword
const userOne= new users('sneha',1235)
console.log(userOne);
const userTwo=new users('amita',6966)
console.log(userTwo);
console.log(userOne);
//return this is ptional for this one it will implicitly return values
// what does new keyword do:
// generates an empty instance and call constructor function then arguments are injected in this and lastly function is called
console.log(userOne.constructor);
//constructor is just a function of itself
