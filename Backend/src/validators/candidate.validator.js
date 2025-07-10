const Joi = require('joi')


const createCandidateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required(),
    jobTitle: Joi.string().required(),
   
})

const updateStatusSchema = Joi.object({
    status: Joi.string().valid('Pending', 'Reviewed', 'Hired').required(),
})

const searchSchema = Joi.object({
    q: Joi.string().allow("").optional(),
    status: Joi.string().valid('Pending','Reviewed','Hired').optional()
})

module.exports = {
    createCandidateSchema,
    updateStatusSchema,
    searchSchema,
}