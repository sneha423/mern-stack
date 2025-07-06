class user{
    //we can add properties and functions in class
    constructor(username,email,password){
        this.username=username
        this.email=email
        this.password=password
    }
    encryptPassword(){
        return (`${this.password}ajivwv`)
    }
    capitalizeUsername(){
        return `${this.username.toUpperCase()}`
    }
}
const xyz=new user('sneha','egowukfview;.com',2640)
console.log(xyz.encryptPassword());
console.log(xyz.capitalizeUsername());

//behind the scene:
//we will create a function user with all th atributes and then add the remaining functions using prototype

//inheritance using class
class users{
    constructor(username){
        this.username=username
    }
    logMe(){
        console.log(`username is ${this.username}`);
        
    }
}
class teacher extends users{
    constructor(username,email,password){
        super(username)//direct access to username no need for this or special call this is the shortcut in class
        this.email=email
        this.password=password
    }
    addCourse(){
        console.log(`a new course was added by ${this.username}`);
        
    }
}
const name=new teacher('amita','lhwcgi asl.com',6320)
name.addCourse()
name.logMe()
const newuser=new users('sumil')
// newuser.addCourse()//no access
newuser.logMe()
// console.log(newuser===name);//false
console.log(newuser instanceof users);//true

//static properties:
class tour{
    constructor(tourName){
        this.tourName=tourName
    }
    printMe(){
        console.log(`destination is ${this.tourName}`);
        
    }
    //static is used when we don't want to give access of a method to all the objects that are instantiated through this class
    static createId(){
        return `123`
    }
}
const place1=new tour('canada')
// console.log(place1.createId());

class price extends tour{
    constructor(charge,tourName){
        super(tourName)
        this.charge=charge
        
    }
}
const price1=new price(24000,'korea')
price1.printMe()
console.log(price1.createId());
