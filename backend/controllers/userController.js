import asyncHandler from 'express-async-handler'
import generateToken from '../utills/generateTokan.js'
import User from '../models/userModel.js'

// Auth user and get Token
const authUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body

    const user = await User.findOne({ email  })

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            gender: user.gender,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

// Register a New user
const registerUser = asyncHandler(async(req,res) =>{
  const {name,email,password,gender} = req.body

  const userExits = await User.findOne({ email  })

  if(userExits){
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    gender,
  })

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  }else{
    res.status(400)
    throw new Error('Invalid User Data')
  }
})


//Get User Profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//Update User Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.gender = req.body.gender || user.gender
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//Get All User Profile GET /api/users  private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  res.json(users)

})

//DELETE a User DELETE /api/users/:id  private/admin
const deleteUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(user){
    await user.remove()
    res.json({ message : 'user Removed'})
  }else{
    res.status(404)
    throw new Error("user Not Found")
  }

})

//Get User by id  GET /api/users/:id  private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if(user){
    res.json(user)
  }else{
    res.status(404)
    throw new Error('User Not Found')
  }

})

//Update User  PUT /api/users/:id Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.gender = req.body.gender || user.gender
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUserById,
    updateUser,
}