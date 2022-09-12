const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/camp');

// console.log(cities[10].city, cities[10].state)

mongoose.connect('mongodb://localhost:27017/YelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random_n = Math.floor(Math.random() * cities.length);
        const camp = new Campground({
            location: `${cities[random_n].city}, ${cities[random_n].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque vitae sunt nemo neque sint architecto quos minima odit. Porro id autem iusto reprehenderit aliquam ea recusandae cum quo harum consequuntur deleniti, eaque soluta aliquid rem saepe voluptatem iure fugiat mollitia perspiciatis cumque laudantium voluptate fuga sapiente laboriosam. Asperiores repudiandae illum veritatis eum dolore, ullam, minus quisquam corrupti aperiam, alias soluta quae voluptatum nobis aliquid modi unde? Pariatur soluta repellendus numquam quis a accusamus? Sint velit non dolor mollitia! Eveniet dignissimos obcaecati sint totam praesentium aliquid saepe. Exercitationem fugit quasi sequi laborum amet molestias doloremque omnis expedita tenetur. Natus, hic porro!",
            img: "https://picsum.photos/400/400",
            price: Math.floor(Math.random()*100)
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})