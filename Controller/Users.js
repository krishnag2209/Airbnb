const User = require('../model/User.js');

// router.use(saveRedirectUrl);
module.exports.Signup = (req, res) => {
    res.render('users/signup.ejs');
}

// post route for signup
module.exports.PostSignup =  async (req, res) => {
    try{
        const {username, email, passport} = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, passport);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                console.error(err);
                return res.redirect('/signup');
            }

            req.flash('success', 'Welcome to Wanderlust!');
           return  res.redirect('/listings');
        });
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
} 
// Login route
module.exports.Loginroute = (req, res) => {
    res.render('users/login.ejs');
}

// Post route for login
module.exports.PostLogin = 
   (req, res) => {
    req.flash('success', 'Welcome to Login Wanderlust !');
    res.redirect(res.locals.redirectUrl || '/listings'); 
    // console.log(res.locals.redirectUrl); // Redirect to the original URL or default to '/listings'
    // res.send('Login successful');
}


// Logout route
module.exports.Logoutroute =  (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.redirect('/listings');
        }
    req.flash('success', 'Logged out successfully!');
        res.redirect('/listings');
    });
}