//object oriented programming
//js does not have classes directly
//why we use OOP: to write code in more systematic way
//Parts of OOP:object literal,constructor function,prototype,classes,instances(new,this)
//4 pillars:abstraction(fetch),encapsulation,inheritance(prototype),polymorphism

//a literal object:
const user={
    username:'sneha',
    loginCount:5,

    getUserDetails:function(){
        console.log('got user details from web');
        
    }
}
console.log(user.loginCount);
user.getUserDetails()