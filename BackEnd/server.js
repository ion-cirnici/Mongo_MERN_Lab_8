const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');

//body-parser for post request
const bodyParser = require('body-parser');
// getting-started.js
const mongoose = require('mongoose');

//Changing the React app to read JSON data from the Node/Express server
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json npm start
app.use(bodyParser.json())

//connection with mongoDb through constant ConnectionString
const myConnectionString = 'mongodb+srv://admin1:admin1@cluster0.z6uzw.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

//defindig Schema of the datatype that I want to store in the database and the GUI on the Database
const Schema = mongoose.Schema;
let movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});
//interaction with database
let MovieModel = mongoose.model("movies", movieSchema);

//returns the following JSON data when a GET request is made to /api/movies
app.get('/api/movies', (req, res) => {
    // const mymovies = [{
    //     "Title": "Avengers: Infinity War",
    //     "Year": "2018",
    //     "imdbID": "tt4154756",
    //     "Type": "movie",
    //     "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    // },
    // {
    //     "Title": "Captain America: Civil War",
    //     "Year": "2016",
    //     "imdbID": "tt3498820",
    //     "Type": "movie",
    //     "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    // },
    // ]
    //model that pass no arguments but will find all the database and send it back
    MovieModel.find((err, data) => {
        res.json(data);
    })
    //sending status 200
    // res.status(200).json({
    //     message: "Everything is OK",
    //     movies: mymovies
    // });
})

app.get('/api/movies/:id', (req, res) => {
    console.log(req.params.id);
    //method that will listen for get (4000/api/movies/:id) and returned back the movies that has at that id
    MovieModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

//post request at /api/movies that is taking the body that is passed up and included
app.post('/api/movies', (req, res) => {
    console.log('Movie Recieved!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
        title:req.body.title,
        year:req.body.year,
        poster:req.body.poster
    })
    //send message item added
    res.send('item Added');
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})