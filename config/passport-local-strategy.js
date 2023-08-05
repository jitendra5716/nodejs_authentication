const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new localStrategy({
    usernameField:'email',
    passReqToCallback:true
},(req,email,password,done)=>{
    User.findOne({email:email}).then((user)=>{
        if(!user || user.password != password){
            req.flash('error',"Invalid Username/Password");
            // console.log("Invalid Username/Password");
            return done(null,false);
        }
        return done(null,user);
    }).catch((err)=>{
        console.log("Error in finding user in passport locals");
        return done(err);
    })
}));


//serializing the user to decide which key is kept in the cookies
passport.serializeUser((user,done)=>{
    return done(null,user);
});

//deserializing user from the key in the cookies

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        return done(null,user);
    }).catch((err)=>{
        console.log("Error in deserializing the user");
        return done(err);
    })
});

//check if user is authenticated 

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signIn');
};

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;