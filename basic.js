//"use strict"; //treat all js cod s newer version
//alert(3+3);//not used directly as we are using node js not browser
console.log('hello')
//variables
//declaring constant
const accountId=122;  //constant(not allowed to change furthur)
//declaring variables:
let accEmail='jcsbdysvwq6';   //can change later,no scope problem
var accPasswd='1223456';     //not used often
accCity='jaipur';
let accstate;   // automatically undefined
// accountId=2;
accEmail='t4tne';
console.log(accountId);
console.table([accEmail,accPasswd,accountId,accCity,accstate]);

//null: value is empty
//undefined: value is not decided yet
//symbol: unique(for react)
console.log(typeof(accEmail));
console.log(typeof(null));//output:object
console.log(typeof(undefined));//output:undefined