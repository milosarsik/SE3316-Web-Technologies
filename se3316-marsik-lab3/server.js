const express    = require('express');        // call express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// define our app using express
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/bearsgo', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());

// error handling middleware
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

// adding api ending
app.use('/api', require('./routes/api'));

app.listen(process.env.PORT || 8080, function(){
    console.log('now listening for requests');
});