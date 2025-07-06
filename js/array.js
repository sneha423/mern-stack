// javascript arrays are resizable
// indexing starts from 0
// when we copy array it make shallow copies(same refernce pt)
//can contain diff datatypes

//array declaration:
const myarr=[3,2,'fvfdk'];//can contain diff datatypes
let arr2=new Array(3,4,5);
console.log(arr2);
arr2.push(10);//insert at end
console.log(arr2);
arr2.pop();//removes at end
console.log(arr2);
arr2.unshift(1);//inserted at start
console.log(arr2);
arr2.shift();//removes from start
console.log(arr2);
console.log(arr2.includes(3));
console.log(arr2.indexOf(3));// -1 if no not present
const newarr=arr2.join();//datatype becomes string
console.log(newarr);
const myarr2=myarr.slice(0,2);
console.log(myarr2);
console.log('B',myarr);
const myarr3=myarr.splice(0,2);
console.log('C',myarr);
console.log(myarr3);

const marvel_hero=['iron man','spiderman','thor']
const dc_hero=['batman','superman','flash']
// marvel_hero.push(dc_hero);//array is pushed inside another array
// console.log(marvel_hero);
const hero=marvel_hero.concat(dc_hero);//arrays are merged in single array
console.log(hero);
const all_heros=[...marvel_hero,...dc_hero];//can be used instead of concat
console.log(all_heros);
const an_arr=[1,2,3,[4,5,6],[7,8,[9,10]]];
const real_an_arr=an_arr.flat(2);
//flat:Returns a new array with all sub-array elements
//     concatenated into it recursively up to the specified depth.
console.log(real_an_arr);
console.log(Array.isArray('sneha'));
console.log(Array.from('sneha')); //convert anything to array
console.log(Array.from({name:'sneha'}));
                            //will give empty array
                            //can't convert this
let score1=200;
let score2=300;                          
console.log(Array.of(score1,score2));

