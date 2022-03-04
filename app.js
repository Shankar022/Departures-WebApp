const express = require('express');
const fs = require('fs');

const app = express();

// app.get('/',(req,res)=>{
//   res.status(200).json({message:'from server side!'});
// })
//
// app.post('/',(req,res)=>{
//   res.send('hello POST !')
// })

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})