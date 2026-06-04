const notAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    return res.status(403).json({ message: 'Admins cannot use cart/order' });
  }
  next();
};

module.exports = { notAdmin };