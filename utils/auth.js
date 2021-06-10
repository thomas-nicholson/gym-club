const auth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/welcome');
    } else {
      next();
    }
  };
  
  module.exports = auth;