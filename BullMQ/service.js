const {Queue,Worker}=require('bullmq');

const initializeQueue=async()=>{
const queue=new Queue('video', {defaultJobOptions:{removeOnComplete:true},connection:{
    port:6379,
   host: 'redis'
}});
return {queue};
}

const initializeWorker = async()=>{
const worker= new Worker('video',(job)=>{
    console.log(job.data);
},{connection:{
    port:6379,
    host: 'redis'
}})
worker.on('completed',()=>{
    console.log('worker has finished performing actions');
})
}

module.exports={initializeQueue,initializeWorker}