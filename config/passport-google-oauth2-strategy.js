const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID:'589135147127-eh8gno3t8fh6kkv14pl6msfaduhcph8u.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({email:profile.emails[0].value}).then((user)=>{
        // console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }).then((user)=>{
                return done(null,user);
            }).catch((err)=>{
                return console.log("Error in google auth to create a user");
            })
        }
    }).catch((err)=>{
        return console.log("Error in finding the user in google auth");
    })
}));

module.exports = passport;

// const passport = require('passport');
// const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const crypto = require('crypto');
// const User = require('../models/user');

// passport.use(new googleStrategy({
//     clientID: '589135147127-eh8gno3t8fh6kkv14pl6msfaduhcph8u.apps.googleusercontent.com',
//     clientSecret:'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',
//     callbackURL:'http://localhost:8000/users/auth/google/callback',
//     passReqToCallback   : true
// },(accessToken,refreshToken,profile,done)=>{
//     console.log(profile)
//     User.findOne({email:profile.emails[0].value}).then((user)=>{
//         // console.log(profile);
//         if(user){
//             return done(null,user);
//         }else{
//             User.create({
//                 name:profile.displayName,
//                 email:profile.emails[0].value,
//                 password:crypto.randomBytes(20).toString('hex')
//             }).then((user)=>{
//                 return done(null,user);
//             }).catch((err)=>{
//                 return console.log("Error in google auth to create a user");
//             })
//         }
//     }).catch((err)=>{
//         return console.log("Error in finding the user in google auth");
//     })
// }));

// module.exports = passport;