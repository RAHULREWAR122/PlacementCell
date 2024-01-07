const User = require('../models/userSchema')

// default user go to sign in page
module.exports.signIn = (req,res)=>{

    return res.render('signIn');

}


module.exports.signUp =async (req,res)=>{
    
    return res.render('signUp')

}

//  user profile
module.exports.profile = (req, res) => {
    if (req.isAuthenticated()) {
        const newUser = req.user;
    //    show all info about user
        return res.render("profile", {
            profile_user: newUser,
        });
    }else {
        return res.redirect('/');
    }
};

// update user profile
module.exports.updateProfile =async (req,res)=>{
// find by user id , if id is matches then update
     if(req.user.id === req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body , (err , user)=>{
            if(err){
                req.flash('error' ,'SomeOne already Use ID-NO Try other ID-NO');
                return res.redirect('back');

            }

            req.flash('success' ,'Employee Updated successfully');
            return res.redirect('back');
        })
    }else{
        console.log('error in update')
        return res.redirect('back');
    }

}


// if user sign then only sign out
module.exports.signOut =async (req,res)=>{

    req.logout((err)=>{
        if(err){
            console.log("Error in log out" , err.message)
        }else{ 
        console.log('logout successfully')
        req.flash('Success' ,'Log Out Successfully');
        return res.redirect('/')
    }
 })
}




//  creating user on sign up page
module.exports.create =async (req,res)=>{

    // first we check password and conform password same or not
    if(req.body.password !== req.body.conform_password){
        console.log("Check your information again");
        return res.redirect('back');
    }
    // now check user email already exists or not
    User.findOne({ email : req.body.email , idNo : req.body.idNo} , (err , user)=>{
        if(err){
            console.log('Email or idNo use Already ,Try again something new');
            req.flash('error', 'Email or idNo use Already ,Try again something new')
            return res.redirect('back');
        }
    //   if user not found then we create user
    if(!user){
        User.create(req.body , (err , user)=>{
            if(err){
                console.log('error in creating user' , err.message);
                req.flash('error', 'Employee Already Exist ,Try to sign-In')
                return res.redirect('/');
         }
           
           req.flash('success' , "Sign-Up Successfully")
           return res.redirect('/');
        })
     }else{
        console.log('error in creating user' , err.message);
        return res.redirect('back');
     }
  })
}

// create session or login
module.exports.createSession = (req,res)=>{   
// this is handle by passport
 req.flash('success' , "Login Successfully")
 return res.redirect('/dashboard');

}