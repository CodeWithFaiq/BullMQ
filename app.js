require('dotenv').config()
const express=require('express');
const { initializeQueue, initializeWorker } = require('./BullMQ/service');
const { json } = require('body-parser');

const app=express();
app.use(json());
const PORT=process.env.PORT || 5000
// 

initializeWorker();

app.use(async(req,res,next)=>{
    const {queue}=await initializeQueue();
    req.queue=queue;
    next();
})

app.post('/',(req,res)=>{
    var date= Date.now();
  const queue=req.queue;
  queue.add(`d_${date}`,req.body.data,{delay:1000*10})
  res.send({message:'Your data has been passed to queue'});
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})