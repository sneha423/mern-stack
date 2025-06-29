//singleton(created with constructor)
//object literals are not singleton
//Object.create(constructor method)


//object literals construction:
const mysym=Symbol('mykey');
const user={
    name:'sneha',
    age:'21',
    loc:'jaipur',
    [mysym]:'mykey1',
    "full name":'sneha gupta'
}
console.log(`name is ${user.name} and age is ${user.age}`);
console.log(user["full name"]);//remember syntax with sq bracks
console.log(user[mysym]);//for accessing symbol
console.log(typeof(user.mysym));

//to overwrite values
user.age=23;
//Object.freeze(user);//now we can't change the value of any property of user
console.log(user);

//functions in js
user.greeting=function(){
    console.log('hello user!!');
    
}
console.log(user.greeting());
console.log(user.greeting);
user.greetingtwo=function(){
    console.log(`hello ${this.name}`);
    
}
console.log(user.greetingtwo());

// const tinderUser=new Object()//singleton object
// const tinderUser={}//non singleton object

//object within an object
const regUser={
    email:'iwefvb.gmail.com',
    fullname:{
        userFullName:{
            first_name:'amita',
            last_name:'gupta'
        }
    }
}
console.log(regUser.fullname.userFullName.first_name);

//combining objects
const obj1={1:'a',2:'b'};
const obj2={3:'a',4:'b'};
//const obj3={obj1,obj2}//will give object in object
//const obj3=Object.assign(obj1,obj2);//will merge the objects
const obj3=Object.assign({},obj1,obj2);//guaranteed result
//to spread objects:
const obj4={...obj1,...obj2,...obj3};
console.log(obj3);
console.log(obj4);

//array of objects(seen in database):
const arrObj=[
    {
        id:1,
        email:'wegbv.com'
    },
    {
        id:2,
        email:'dvvrrv.com'
    },
    {
        id:1,
        email:'wefrf3ebv.com'
    }  
]
console.log(arrObj[1].email);
//IMP:
console.log(Object.keys(obj2));//will return an array
console.log(Object.values(obj2));
console.log(Object.entries(obj2));//array inside an array
console.log(obj1.hasOwnProperty('3'));


//de-structuring of objects:
const course={
    name:'efbbqw;',
    price:8934,
    courseTeacher:'h2e4f2lk'
}
//another way to call values(used in react)
const {courseTeacher:instructor}=course;
// console.log(courseTeacher);
console.log(instructor);//another way

//in react we will use
// const navbar=({companyName})=>{

// }
// navbar(companyName='dgewgdgq')
// when we see {} in react it is related to de-structuring

//concept of API (in brief)
//JSON(typeof object)
//IN THIS BOTH KEYS AND VALUES ARE STRINGS
// {
//     'name':'gwdgewdlb',
//     'cost':'8521',
//     'coursename':'gewugfeqbaslk'
// }
//API(JSON) are also found in the form of array
//syntax:
// [
//     {},
//     {}
// ]