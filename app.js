const express = require('express')
const engine = require('ejs-mate')
const methodOverride = require('method-override')
const morgan = require('morgan')

const mongoose = require('mongoose')
const appError = require('./appError')

const crudRouter = require('./routes/crud')
const reviewRouter = require('./routes/review')
const path = require('path')
const { errorHandler } = require('./middleware/middleware')
const app = express()



mongoose.connect('mongodb://localhost:27017/YelpCamp', { useNewUrlParser: true })
    .then(() => {
        console.log("connection successful")
    })
    .catch(err => {
        console.log(err)
    })

app.engine('ejs', engine)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(morgan('tiny'))



//Routers
app.use('/campgrounds', crudRouter)
app.use('/campgrounds', reviewRouter)

app.use('/', (req, res)=>{
    res.send('HOME Page, kindly go to /campgrounds to access the main page')

})


app.all('*', ()=>{
    throw new appError('Page does not exist', 404)
})


app.use(errorHandler)


app.listen(3000, ()=>{
    console.log("listening at port 3000")
})