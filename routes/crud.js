const {validateCampground} = require('../middleware/middleware')
const express = require('express')
const wrapAsync = require('../asyncWrapper')
const Campground = require('../models/camp')
const appError = require('../appError')
const {errorHandler} = require('../middleware/middleware')

const router = express.Router()

router.get('/', wrapAsync(async (req, res) =>{
    const campgrounds = await Campground.find({})
    res.render('home', {campgrounds})
}))

router.get('/new', wrapAsync(async(req, res) => {
    res.render('new')
}))

router.get('/:id', wrapAsync(async (req,res) =>{

    const {id} = req.params
    const campground = await Campground.findById(id).populate('reviews')
    if(!campground){
        throw new appError('Invalid Campground', 404)
    }
    res.render('viewCampground', {campground})
    

}))

router.get('/:id/update', wrapAsync(async(req, res) =>{
    const {id} = req.params
    const campground = await Campground.findById(id)
    // console.log(campground)
    if(!campground){
        throw new appError('Invalid Campground', 404)
    }
    res.render('update', {campground})
}))



router.post('/',validateCampground,  wrapAsync(async (req, res) =>{
    const newCampground = new Campground(req.body.campground)
    await newCampground.save()
    res.redirect('/')
}))


router.patch('/:id',validateCampground,  wrapAsync(async(req,res) =>{
    const obj = {"_id" : req.params.id}
    const campground = await Campground.findByIdAndUpdate(obj, req.body.campground, {new : true})
    res.render('viewCampground', {campground})
}))

router.delete('/:id', wrapAsync(async(req, res) =>{ 
    console.log('about to delete')
    await Campground.findOneAndDelete({"_id" : req.params.id})
    console.log('deleted')
    res.redirect('/campgrounds')
}))


router.use(errorHandler)


module.exports = router