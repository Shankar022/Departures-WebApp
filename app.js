const express = require('express');
const fs = require('fs');

const app = express();

//middleware
app.use(express.json());
app.use((req,res,next)=>{
    req.currentTime = new Date().toISOString();
    next();
})

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt:req.currentTime,
        results: tours.length,
        data: {
            tours: tours
        }
    })
};

const getTour = (req, res) => {
    // console.log(req.params);
    // /api/v1/tours/:id/:x?
    // id is required and x is optional parameter
    const id = req.params.id * 1;
    const tour = tours.find(ele => ele.id === id)
    //if (id > tours.length - 1) {
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    })
};
const createTour = (req, res) => {
    // console.log(req.body)
    // to get all data in the req object from the request we should use middleware.
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
};

const updateTour = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length - 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here !>'
        }
    })
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    if (id > tours.length - 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})