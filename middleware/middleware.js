const appError = require('../appError')
const {reviewSchema, campgroundSchema} = require('../joiSchemas')
const Campground = require('../models/camp')

const errorHandler = (err, req, res, next)=>{
    console.log(err)
    const {status=500, message='Something went wrong'} = err
    res.status(status)
    res.render('errorPage', {status, message})
}



const validateReview = async function(req, res, next){
    const {id} = req.params
    const result = await Campground.findById(id)
    if(!result){
        return next(new appError("Campground doesn't exist", 404 ))
    }
    const {error} = reviewSchema.validate(req.body)
    if(error){
        message = error.details.map(msg => msg.message)
        return next(new appError(message, 404))
    }
    next()
}

const validateCampground = function(req, res, next){
    const {error} = campgroundSchema.validate(req.body)
    if(error){
        message = error.details.map(msg => msg.message)
        return next(new appError(message, 404))
    }
    next()
}


module.exports = {validateCampground, validateReview, errorHandler}