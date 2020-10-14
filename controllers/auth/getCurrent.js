module.exports = (req, res) => {
  res.json({ user: req.user.email, id: req.user._id });
};
