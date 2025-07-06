function setUsername(username){
    this.username=username
    console.log('called');
    
}
function createUser(username,email,password){
    setUsername.call(this,username)
    //call method passes our current execution to diff function and we use this in there to pass reference
    this.email=email
    this.password=password
}
const user1=new createUser('sneha','iegigv.com',2946)
console.log(user1);
