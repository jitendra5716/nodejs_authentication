const User = require('../models/user');

module.exports.profile = (req,res)=>{
    User.findById(req.params.id).then((user)=>{
        return res.render('profile',{
            user:user
        })
    }).catch((err)=>{
        return console.log(err);
    })
}

module.exports.signIn = (req,res)=>{
    return res.render('sign_in');
}
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('sign_up');
}

//create user
module.exports.create = (req,res)=>{    
    if(req.body.password != req.body.confirm_password){
        req.flash('error','Password and Confirm Password Not Matched!')
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}).then((user)=>{
        if(user){
            return res.redirect('back');
        }else{
            User.create(req.body).then(()=>{
                return res.redirect('/users/signIn');
            }).catch((err)=>{
                return console.log("Error in creating the user");
            })
        }
    }).catch((err)=>{
        return console.log("Error in finding the user while creating");
    })
};


// create session

module.exports.createSession = (req,res)=>{
    req.flash("success","Logged in Successfully");
    res.redirect('/');
    
    return;
}

//destroy session

module.exports.destroySession = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return console.log("Error in signout");
        }
        req.flash('success','Logged Out Successfully!');
        return res.redirect('/');
    });
    
};

module.exports.resetPassword = (req,res)=>{
    // console.log(req.body.email);
    // return res.redirect('back');
    User.findOne({email:req.body.email}).then((user)=>{
        // console.log(user.password);
        user.password = req.body.password
        user.save();
        return res.redirect('/users/profile');
    }).catch((err)=>{
         console.log("Error in finding the user for reset password");
         return
    })
}

module.exports.resetPage = (req,res)=>{
    return res.render('resetpasswordpage');
}