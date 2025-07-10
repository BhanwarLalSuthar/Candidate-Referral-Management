const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    jobTitle: {type: String, required: true},
    status : { type: String, enum: ['Pending', 'Reviewed', 'Hired'], default: 'Pending'},
    resumeUrl: {type: String, required: true},
    referredBy : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
},{timestamps: true, versionKey: false})

module.exports = mongoose.model('Candidate', candidateSchema)