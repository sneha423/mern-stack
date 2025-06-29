//high order array loops:
const arr=[1,3,3,2,1];
for(const num of arr){
    console.log(num);
}
//maps:
const map=new Map();
map.set('IN','India')
map.set('USA','America')
for(const [key,value] of map){
    console.log(key,':-',value);
}

//loop on Object:
const myobj={
    name:'sneha',
    age:21
}
// for(const [key,value] of myobj){
//     console.log(key,':-',value);
    
// }   output:myobj is not iterable
for(const [key,value] in myobj){ //here we use 'in'
    console.log(key,':-',value);
} 
//use of 'in' in array:
for(const num in arr){
    console.log(arr[num]);
}
//'in' an' be used in maps as map is not iterable

//forEach loop
const coding=['js','java','cpp','python'];
// coding.forEach(function(val){
//     console.log(val);
// })
coding.forEach((item,index,arr)=>{
    console.log(item,index,arr);
})
//we can also define function seperately
//and then call in forEach loop
//index and arr are extra parameters

//for array of objects:
const myCode=[
    {
        lang:'javascript',
        code:'js'
    },
    {
        lang:'cpp',
        code:'c++'
    },
    {
        lang:'python',
        code:'py'
    }
]
myCode.forEach((item)=>{
    console.log(item.lang);
})
//now if we want forEach loop to return some value:

// const myvalues=myCode.forEach((item)=>{
//     console.log(item.lang);
//     return item.lang;
// })
// console.log(myvalues);
//CONCLUSION: 
//forEach loop doesnot return any value

//filter map
const mynum=[1,2,3,4,5,6,7];
//in filter a call back function is used
// const myval=mynum.filter((item)=>item>3)
// console.log(myval);
//or
const myval=mynum.filter((item)=>{
    return item>3;
})
console.log(myval);

//maps return the values automatically
const nums=[1,2,3,4,5,6,7,8];
const newnums=nums.map((no)=>{return no+10})
console.log(newnums);

const newnums2=nums.map((num)=>num*10).map((num)=>num+1).filter((num)=>num>40);
console.log(newnums2);

//reduce function
const arr1=[1,2,3,4,5];
const initialValue=0;
const finalSum=arr1.reduce((accumulator,currentvalue)=>{
    console.log(`acc: ${accumulator}, current: ${currentvalue}`)
    return accumulator+currentvalue},initialValue);
console.log(finalSum);
