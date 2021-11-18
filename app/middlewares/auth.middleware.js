module.exports = (opts) => (req, res, next) => {
  console.log(req.originalUrl);
  if (opts.onlyCheck.includes(req.originalUrl)) {
    if (req.query.id === 1) {
      console.log('valid user');
      req.validUser = true;
      next();
    } else {
      res.send('Unauthorized user');
    }
  } else {
    next();
  }
};
