const User = require('../models/user');

module.exports.create = async function (req, res){
    try{
        if(req.body.confirmPassword != req.body.password){
            return res.redirect('back');
        }

        let post =  await User.findOne({email : req.body.email});

        if(!post){
            
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })

            return res.redirect('/login');
        }

        return res.redirect('/login')

    }catch(err){ 
    
        return res.redirect('/signup')
        
    }   
}

module.exports.createsession = async function(req, res){
    try{
        let user = await User.findOne({email:req.body.email});

        if(!user){
            return res.redirect('/signup')
        }

        if(user.password == req.body.password){
            return res.redirect('/');
        }
        else{
            return res.redirect('/login')
        }

    }catch(err){

        console.log(err)
        return res.redirect('/signup')
    }
}

module.exports.redirectToHome = function(req, res){
    // req.flash('success', 'Logged in Successfully');
    console.log(req.user);
    return res.redirect('/');
}


module.exports.profile = function(req, res){
    return res.render('profile', {userprofile:req.user});
}



