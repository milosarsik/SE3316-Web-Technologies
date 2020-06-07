const uri = "mongodb+srv://milosarsic:milosarsic1@cluster0-9md8h.mongodb.net/test?retryWrites=true&w=majority"

const mongoose = require('mongoose');

var User = require("./models/user");
var Song = require('./models/song'); //get the model of the schema for each 

mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
});

console.log('Connected to the database (mongoose)')


const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

var app = express();

app.use(cors());
cors({credentials: true, origin: true}) 

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;  

var router = express.Router();              

app.use('/api', router);

app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods',"GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers',"Content-Type");
    next();
});

// STARTING THE SERVER
app.listen(port);
console.log('Connected on port ' + port);

// ROUTES
router.get('/', function(req, res) {
    res.send('Testing API...');   
});

// Registering an open user
router.post("/open/register",function(req,res) { 
    
    const { 
        email, password 
    } = req.body;
    
    if (!email || !password) {
        res.send("Fill in the fields!");
      }
    else
    {
        User.findOne({ email: email }).then(user => {
            if (user) 
            {
              res.send("This email already exists!");
            }
            else { 
                const newUser = new User({
                  email,
                  password,
                  isActive: true,
                  isAdmin: false
                });
                crypto.randomBytes(32, function(err, salt) { 
                    if(err) throw err; 
                    //store password with argon 2
                    argon2i.hash(req.body.password, salt).then(hash => { 
                      console.log(hash);
                      newUser.password = hash;
                      newUser.save(function (err) {
                        if (err) {
                            res.send("error: "+err);
                        }
                      });
                    });
                
                });
                res.send(newUser); 
            }    
        });
    }
}); 

// Get list of songs
router.get('/open/songs',function(req,res,next){
    Song.find().exec(function(err, songs){
        if(err){
            return next(err);
        }
        songs.sort((a, b) => (a.numOfReviews < b.numOfReviews) ? 1 : (a.numOfReviews === b.numOfReviews) ? ((a.year < b.year) ? 1 : -1) : -1 );

        return res.send(songs.slice(0,10));
    })
});

// Add a song
router.post("/secure/song",function(req,res) {
    try{
        var song = new Song({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year,
            track: req.body.track,
            genre: req.body.genre
        });
        song.save(function (err) {
            if (err) {
                res.send("error: " + err);
            }
    })
    res.send(song);
    }
        catch(ex){
            res.send("error adding song");
    }
});

// Get all users
router.get('/open/getusers',function(req,res,next){
    User.find().exec(function(err, users){
        if(err){
            return next(err);
        }
        return res.send(users);
    })
});

// Put SOMETHING
router.put("/user",function(req,res,next){
        const email=req.body.email;
        const password=req.body.password;
        
        User.findOne({ email: email },function(err,user)
        {
             
            
            if (err){
                return res.send(err);
            }
            else
            {
                console.log("found user")
                console.log(password)
                var test = new Buffer(password)
                argon2i.verify(user.password,test).then(result=>
                {
                    if(result== true){res.send(user)}
                     else{
                         res.send("password doesnt match")
                         
                     }
                 })
                
            }
        });
});

// TEST ROUTES
// update a bear in the db
router.put('/secure/user/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    }).catch(next);
});