const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDb connected')
    } catch (error) {
        console.log('mongoDB connection error:', error)
        process.exit(1)
    }
}

module.exports = connectDB