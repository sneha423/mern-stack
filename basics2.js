//string interpolation
//note the sign ``
const name='sneha';
const age=21;
console.log(`hello, my name is ${name} and my age is ${age}`);

//new way of declaring string
const game=new String('pubg');
// string operations
console.log(game[0]);
console.log(game.__proto__);//object of string
console.log(game.length);
console.log(game.toUpperCase());
console.log(game.charAt(3));
console.log(game.indexOf('g'));//-1 if not found
console.log(game.slice(0,2));//last index value is not included
console.log(game.slice(-1,4));//can reverse also
const newstr='   ewhfewk  jsbcl  ';
console.log(newstr);
console.log(newstr.trim());//removes space from front and end(not in b/w)
console.log(newstr.replace('ew','-'));
console.log(newstr.includes('eh'));
console.log(newstr.split('-'));

//numbers
const no1=new Number(10000000);
console.log(no1);
console.log(no1.toString().length);
console.log(no1.toFixed(3));//decimal point
const no2=55635.09475
console.log(no2.toPrecision(4));//return a string
console.log(no1.toLocaleString());//american standard
console.log(no1.toLocaleString('en-IN'));//indian standard


//Maths
console.log(Math);
console.log(Math.abs(-34));
console.log(Math.min(4,3,5));
console.log(Math.random());//always b/w 0 and 1
console.log(Math.floor(Math.random()*10)+1);//value will lie b/w 1 and 9
const min=10
const max=20
console.log(Math.floor(Math.random()*(max-min+1))+10);//generic formula


//date and time
let mydate=new Date();
console.log(mydate);
console.log(mydate.toString());
console.log(mydate.toISOString());
console.log(mydate.toDateString());
console.log(mydate.toJSON());
console.log(mydate.toLocaleString());
console.log(typeof(mydate));

const mycreateddate=new Date(2023,1,22);//month starts from 0(jan)
console.log(mycreateddate.toDateString());

let mytime=Date.now();//in milliseconds
console.log(mytime.toLocaleString());
console.log(mycreateddate.getTime());
console.log(mycreateddate.getHours());
console.log(Math.floor(Date.now()/1000));
