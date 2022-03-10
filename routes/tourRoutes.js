const express = require('express');
const {
    getAllTours,
    createTour,
    getTour,
    updateTour,
    deleteTour,
    aliasTopTours,
    getTourStats
} = require('./../controllers/tourController');

const tourRouter = express.Router();

tourRouter
    .route('/top-5-cheap')
    .get(aliasTopTours, getAllTours);

tourRouter
    .route('/tour-stats')
    .get(getTourStats);

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = tourRouter;
