const express = require('express');

const app = express();

app.get('/',(req,res)=>{
  res.status(200).json({message:'from server side!'});
})

app.post('/',(req,res)=>{
  res.send('hello POST !')
})

const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`App is running on port ${PORT}`);
})