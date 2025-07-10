const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.middleware')
const validate = require('../middleware/validate.middleware')

const { upload } = require("../middleware/multer.middleware")

const{
    createCandidateSchema, 
    updateStatusSchema,
    searchSchema,
} = require('../validators/candidate.validator')

const {
    createCandidate,
    getAllCandidates,
    searchCandidates,
    updateCandidateStatus,
    deleteCandidate,
} = require('../controllers/candidate.controller')

// All routes are protected
router.use(auth);

// // POST /candidates (with resume upload)
router.post(
  '/',
  upload.single("file"),
  // validate(createCandidateSchema, 'body'),
  createCandidate
);

router.get('/', getAllCandidates);

router.get('/search', validate(searchSchema, 'query'), searchCandidates);

router.put('/:id/status', validate(updateStatusSchema, 'body'), updateCandidateStatus);

router.delete('/:id', deleteCandidate);

module.exports = router;