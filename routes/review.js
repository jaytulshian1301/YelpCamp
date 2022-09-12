const express = require('express')
const router = express.Router()
const {validateReview}= require('../middleware/middleware')
const wrapAsync = require('../asyncWrapper')
const Review = require('../models/review')
const Campground = require('../models/camp')

// router.use(express.urlencoded({extended: true}))


router.post('/:id/addreview',validateReview,  wrapAsync(async(req, res, next) =>{
    const {id} = req.params
    const review = await Review(req.body.review)
    const campground = await Campground.findById(id)
    await review.save()
    campground.reviews.push(review)
    await campground.save()
    res.redirect(`/campgrounds/${id}`)
}))


module.exports = router