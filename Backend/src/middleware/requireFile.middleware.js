module.exports = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Resume PDF is required' });
  }
  next();
};