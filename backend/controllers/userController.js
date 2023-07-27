import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";



//@desc   Auth user/set token
//route   POST /api/users/auth
//@access Public 
//async used for wait for the response

const authUser = asyncHandler(async (req,res) => {
   const {email, password} = req.body;

   const user = await User.findOne({email})

   if(user && (await user.matchPassword(password))){
    generateToken(res, user._id)
    res.status(201).json({
        _id :user._id,
        name: user.name,
        email: user.email

    })
   }else {
    res.status(401);
    throw new Error('Invalid email or Pasword')
   }
    //res.status(200).json({message:"Auth User"});
});

//@desc  Register a new user
//route   POST /api/users/
//@access Public 

const registerUser = asyncHandler(async (req,res) => {

     //console.log(req.body);

     //check if user exist or not
     const {name, email,password} = req.body;

     const userExist = await User.findOne({email});

     if(userExist){
        res.status(400)
        throw new Error('User Already Exist')
     }


     const user =  await User.create({
        name,
        email,
        password
     })

     if(user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
            
        })

     } else {
         res.status(400);
         throw new Error('Invalid user data');
     }
   
   // res.status(200).json({message: "Register User"})
})

//@desc   Logout the user
//route   POST /api/users/logout
//@access Public 

const logoutUser = ( async (req,res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0),
    });
    res.status(200).json({message: "Logout User"})
})

//@desc   Get user profile
//route   GET /api/users/profile
//@access Private 

const getUserProfile = asyncHandler(async (req,res) => {
    const user = {


            _id: user._id,
            name: user.name,
            email: user.email,
    

    }

    res.status(200).json(user)
})

//@desc   Update the user profile
//route   PUT /api/users/profile
//@access Private 

const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    }else{
        res.status(404);
        throw new Error('user not found');
    }


   // res.status(200).json({message: "Update User"})
})

export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};