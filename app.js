const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');
const { ListingSchema, reviewSchema } = require('./schema.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('./model/User.js')


const listingrouter = require('./router/listing.js')
const reviewsrouter = require('./router/review.js');
const userrouter = require('./router/user.js');

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsmate)
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));

// DATABASE connectivity :--
const MONGO_URL = 'mongodb://localhost:27017/Wander_lust';

main()
    .then(() =>{
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
    
  async function main (){
    await mongoose.connect(MONGO_URL);
}

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,  
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for flash messages
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user; // Make currentUser available in templates
    next();
});

// app.get('/demouser', async(req, res) => {
//     const user = new User({
//         email:'w3344@gmail',
//         username: 'hello',
//     });
//    const registeruser =  await User.register(user, '1234');
//     res.send(registeruser);

// });

app.use('/listings',listingrouter);
app.use('/listings/:id/reviews',reviewsrouter);
app.use('/', userrouter);

// SERVER LISTENING :-- and error handling :--

// 404 handler
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// Error-handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    // res.status(statusCode).send(message);
    res.render('./listings/Error.ejs', { message});
});

app.listen(8080 , () =>{
    console.log('Server is running on port 8080');
})

app.get('/', (req, res) => {
    res.send('Hello World');
});



