
const Candidate = require('../models/Candidate');
const { default: cloudinaryUpload } = require('../utils/cloudinaryUpload');


exports.createCandidate = async (req, res) => {
  
  // return
  try {
    if (!req.file) 
      return res.status(400).json({ message: 'Resume PDF is required' });

    const { name, email, phone, jobTitle, status } = req.body;

    const resume = await cloudinaryUpload(req.file.path);
    

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      jobTitle,
      resumeUrl: resume.url,
      referredBy: req.user._id,
    });

    res.status(201).json(candidate);
  } catch (error) {
    // next(error);
    console.log(error)
  }
};

// Fetch all candidates
exports.getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find({ referredBy: req.user._id });
    res.json(candidates);
  } catch (err) {
    next(err);
  }
};

// Search candidates
exports.searchCandidates = async (req, res, next) => {
  try {
    const { q, status } = req.query;
    const filter = { referredBy: req.user._id };
    if (q) filter.jobTitle = new RegExp(q, 'i');
    if (status) filter.status = status;

    const results = await Candidate.find(filter);
    res.json(results);
  } catch (err) {
    next(err);
  }
};

// Update candidate status
exports.updateCandidateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const candidate = await Candidate.findOneAndUpdate(
      { _id: id, referredBy: req.user._id },
      { status },
      { new: true }
    );
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (err) {
    next(err);
  }
};

// Delete a candidate
exports.deleteCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findOneAndDelete({ _id: id, referredBy: req.user._id });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json({ message: 'Candidate deleted' });
  } catch (err) {
    next(err);
  }
};