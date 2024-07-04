import asyncHandler from "express-async-handler";
import User from '../Models/userModel.js';
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExisted = await User.findOne({ email });

    if (userExisted) {
        res.status(400);
        throw new Error("User Already Exist");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0),
    });

    res.status(200).json({ message: "User Logged out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };

    res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if(req.body.password){
        user.password = req.body.password
      }
      if(req.file){
        user.profileImageName = req.file.filename || user.profileImageName;
    }
      const updatedUser = await user.save()
      res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        profileImageName:updatedUser.profileImageName
      })
    }else{
      res.status(404)
      throw new Error('User not found')
    }
})

export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};