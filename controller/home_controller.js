module.exports.home = (req,res)=>{
    return res.render('home');
}

module.exports.signIn = (req,res)=>{
    return res.render('sign_in');
}
module.exports.signUp = (req,res)=>{
    return res.render('sign_up');
}