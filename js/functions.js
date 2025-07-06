//basic syntax:
function name(){
    console.log('sneha');
}
name()
function sum(number1,number2){
    console.log(number1+number2);  
}
sum(3,4);//passing arguments
sum(3,'4');
sum(3,'a');
sum(3,null)
const result=sum(2,1);
console.log(result);//it shows undefined as we have not returned anything in our funtion

function returnSum(number1,number2){
    let res=number1+number2;
    return res;
}
const ourRes=returnSum(4,5)
console.log(ourRes);

function loginUser(username='sam'){  
    //some initial value is passed in case we are 
    // not passing any value later
    return `${username} just logged in`;
}
console.log(loginUser('rahul'));
console.log(loginUser());

//when no of parameters are not known:
//using rest operator(...)
function calPrice(...num1){
    return num1;
}
console.log(calPrice(200,300,100));

const user={
    username:'amita',
    price:200
}
function handleObj(anyobject){
    console.log(`username is ${anyobject.username} and price is ${anyobject.price}`);
}
handleObj(user);