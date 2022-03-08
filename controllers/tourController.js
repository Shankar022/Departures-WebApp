const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

exports.getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      requestedAt: req.currentTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  };
  
exports.getTour = (req, res) => {
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
  
exports.createTour = (req, res) => {
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
  

exports.updateTour = (req, res) => {
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
  
  
exports.deleteTour = (req, res) => {
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