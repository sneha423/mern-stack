class user{
    constructor(username,password){
        this.username=username
        this.password=password
    }
    //if we define getter then we have to define setter also
    //we have to use _ for reference
    get password(){
        return this._password.toUpperCase()
    }
    set password(value){
        this._password=value
    }
}
const user1=new user('sneha','guwqs')
console.log(user1.password);

//old syntax of getter and setter
function destination(name,price){
    this.name=name,
    
    Object.defineProperty(this,'price',{
        get: function(){
            return this._price+500
        },
        set:function(value){
            this._price=value
        }
    })
    this.price=price
}
const dest1=new destination('korea',40000)
console.log(dest1.price);
