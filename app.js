const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

//1) middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.currentTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) route handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.currentTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params);
  // /api/v1/tours/:id/:x?
  // id is required and x is optional parameter
  const id = req.params.id * 1;
  const tour = tours.find((ele) => ele.id === id);
  //if (id > tours.length - 1) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
const createTour = (req, res) => {
  // console.log(req.body)
  // to get all data in the req object from the request we should use middleware.
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here !>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message:'this route is not defined yet !'
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message:'this route is not defined yet !'
    })
}
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message:'this route is not defined yet !'
    })
}
const createuser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message:'this route is not defined yet !'
    })
}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message:'this route is not defined yet !'
    })
}
// 3) routes

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

tourRouter
    .route('/')
    .get(getAllTours)    
    .post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

const userRouter = express.Router();
app.use('/api/v1/users', userRouter);
  
userRouter
    .route('/')
    .get(getAllUsers)
    .post(createuser)
    
userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

// 4) app start

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
