const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.register = async (req, res, next) => {
    try {
        const { username, email, password} = req.body
        // console.log(req.body)
        const existing = await User.findOne({ email })
        if (existing) return res.status(409).json({ message: 'Email already in use'})

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, passwordHash })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(201).json({ user: {id: user._id, username, email}, token})
    } catch (error) {
        console.log("error :", error)
        next(error)
    }
}

exports.login = async(req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = await User.findOne({ email})
        if (!user) return res.status(401).json({ message: 'Invalid credentials' })
        
        const valid = await user.comparePassword(password)
        if (!valid) return res.status(401).json({message: "invalid credentials"})

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'})
        res.json({ user: {id: user._id, username: user.username, email}, token})
    } catch (error) {
        next(error)       
    }
}