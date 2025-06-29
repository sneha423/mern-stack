//let var and const
let a=300

if(true){
    let a=10;
    const b=20;
    var c=30;
}
//the scope of these variables should be inside the loop only
// console.log(a);
// console.log(b);
console.log(c);//var is a problem in scope
               //its value can be chnaged later on
//under loop is block scope
//outside loop is global scope
console.log(a);
//let:global and scope level value is diff

//in nested loops:
function one(){
    const username='sneha'
    function two(){
        const website='youtube'
        console.log(username);
        
    }
    // console.log(website);
    two()
    
}
one()

//'this' operator can be used in object but not in functions
//explicit and implicit return:
//explicit:
const add=(num1,num2)=>{
    return num1+num2;
}
//implicit:(used in REACT)
const add2=(num1,num2)=>(num1+num2);
console.log(add(3,4));
console.log(add2(3,4));

//IMP concept in database pt of view
//IIFE(immediately invoked function expressions)

(function print(){
    console.log('database connected');
})();
//in this semicolon is imp to end its immediate execution
//() first parantheses is for function definition
//() second for function execution
// can be used for arrow operator also
( ()=>{
    console.log('hello');
})();

//with arguments:
( (name)=>{
    console.log(`hello ${name}`);
})('sneha');


// theory : js execution context
// 1. global
// 2. function
// 3. eval(related to global )
// phases:
// 1. memory creation phase(memory allocation)
// 2. execution phase

//'=' assignment operator
//'==' comparison operator
//'===' comparison + also compares the datatype

// in loops
// falsy values:false,0,-0,BigInt 0n,'',null,undefined,NaN
//truthy values:'0','false',[],{},function(){}

// nullish coalescing operator (??):null undefined
let val1;
val1=5??10;
console.log(val1);
//used in database alot when we are getting diff values 
//along with null so to prevent that we use ?? operator
let val2=null??10;
console.log(val2);

//ternary operator
// condition? true:false
