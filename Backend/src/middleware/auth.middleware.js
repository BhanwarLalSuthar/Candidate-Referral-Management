const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).json({ message: "Authentication required" })
        
        const token = authHeader.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(payload.id)

        if (!user) return res.status(401).json({ message: 'Invalid token'})
        
        req.user = user
        next()
        } catch (error) {
        res.status(401).json({ message : "Authentication failed"})
    }
}

