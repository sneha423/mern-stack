const fs=require('fs')
const { argv } = require('process')
const filePath='./tasks.json'


const loadTasks=()=>{
    try {
        const dataBuffer=fs.readFileSync(filePath)
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}
const saveTasks=(tasks)=>{
    const dataJson=JSON.stringify(tasks)
    fs.writeFileSync(filePath,dataJson)
}
const addTask=(task)=>{
    const tasks=loadTasks()
    tasks.push(task)
    saveTasks(tasks)
    console.log('task added',task);
    
}
const listTasks=()=>{
    const tasks=loadTasks()
    tasks.forEach((task,index) => {
        console.log(`${index+1} - ${task}`);
        
    });
}

const command=process.argv[2]
const argument=process.argv[3]
const removeTask=(arg)=>{
    const tasks=loadTasks()
    //in this indexing starts from 1
    const delTask=tasks.splice(arg-1,1)
    saveTasks(tasks)
    console.log(`removed task: ${delTask[0]}`);
    
}
if(command==='add'){
    addTask(argument)
}else if(command==='list'){
    listTasks()
}else if(command==='remove'){
    removeTask(parseInt(argument))
}else{
    console.log('command not found');
    
}