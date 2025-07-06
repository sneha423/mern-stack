//datatype conversion
let score="13sq";
console.log(typeof(score));
let valueInNum=Number(score);
console.log(valueInNum);    //output is NaN so it is not tan actual value
                            //for null it is 0
                            //for undefined it is NaN
                            //1->true   0->false
                            //""->false
                            //"dssajbd"->true
console.log('1'+2);//12
console.log(1+'2');//12
console.log('1'+'2');//12
console.log('1'+2+2);//122
console.log(1+2+'2');//32
console.log(true);//true
console.log(+true);//1
//  console.log(true+); //error


//comparison of diff datatypes
console.log('2'>1);
console.log('02'>1);
//null sometimes convert in NaN or 0(avoid these)
console.log(null==0);
console.log(null>=0);
console.log(undefined==0);
console.log(undefined<0);

//===(compares datatype also)
console.log('2'===2);

// summary
// primitive:
// 7 types:String,number,boolean,null,undefined,Symbol,BigInt
// Referencer(non primitive): Array,Object,functions

//stack (primitive) and heap(non primitive) memory

//in stack,a var is just copied and given diff value when changed
let name1='bicbb';
let name2=name1;
name2='kcbsc';
console.log(name1);
console.log(name2);
console.log(name1);

//in heap, through refernce valuses are changed
let user1={
    email:'befefnewlknl',
    upi:'ewbvw'
}
let user2=user1;
user2.email='ldcwckbwj'
console.log(user1.email);
console.log(user2.email);
