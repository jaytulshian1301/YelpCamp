const joi = require('joi')

const campgroundSchema = joi.object({
    campground: joi.object({
        location: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required(),
        img: joi.string().required(),
        reviews: [joi.object({
            text: joi.string(),
            stars: joi.number().integer().min(0).max(5).required()
        })]
    }).required()
})

const reviewSchema = joi.object({
    review: joi.object({
        text: joi.string().allow(''),
        stars: joi.number().required().integer().min(0).max(5)
    }).required()
})



module.exports = {reviewSchema, campgroundSchema }