const Tour = require('./../models/tourModel')


// CONTROLLER FUNCTIONS

exports.getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      requestedAt: req.currentTime,
      // results: tours.length,
      // data: {
      //   tours: tours,
      // },
    });
  };
  
exports.getTour = (req, res) => {
    // console.log(req.params);
    // /api/v1/tours/:id/:x?
    // id is required and x is optional parameter
    const id = req.params.id * 1;
    // const tour = tours.find((ele) => ele.id === id);
    //
    //   res.status(200).json({
    //   status: 'success',
    //   data: {
    //     tour: tour,
    //   },
    // });
};
  
exports.createTour = (req, res) => {
    // to get all data in the req object from the request we should use middleware.
    res.status(201).json({
        status: 'success',
        // data: {
        //     tour: newTour,
        // },
    });
  };
  

exports.updateTour = (req, res) => {
    const id = req.params.id * 1;

    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here !>',
      },
    });
  };
  
  
exports.deleteTour = (req, res) => {
    const id = req.params.id * 1;
   
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };