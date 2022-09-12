const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')
const Camp = new Schema({
    location: String,
    title: String, 
    description: String, 
    price: {
        type: Number,
        default: 0,
        require: true
    },
    //TODO: Change Image type as file later
    img: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]

})

Camp.post('findOneAndDelete',function(doc){
    console.log(doc)
    doc.reviews.forEach(async function(entry){
        console.log(entry)
        await Review.findByIdAndDelete(entry)
    })
})

const Campground = mongoose.model('Camp', Camp)



module.exports = Campground