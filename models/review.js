const mongoose = require('mongoose')




const ReviewSchema = new mongoose.Schema({
    text: String,
    stars:{
        required: true,
        type: Number,
        min: 0,
        max: 5
    }

})  

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review