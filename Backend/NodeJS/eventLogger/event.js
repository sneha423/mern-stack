const fs=require('fs')
const os=require('os')
const EventEmitter=require('events')
class Logger extends EventEmitter{
    log(message){
        this.emit('message',{message})
    }
}

const logger=new Logger()
const logFile='./eventlog.txt'

const logToFile=(event)=>{
    const logMessage=`${new Date().toISOString()} - ${event.message} \n`
    fs.appendFileSync(logFile,logMessage)
}
logger.on('message',logToFile)//this line listens to 6th line emit

setInterval(()=>{
    const memusage=(os.freemem()/os.totalmem())*100
    logger.log(`current mem usage: ${memusage.toFixed(2)}`)
},3000)

logger.log('application started')