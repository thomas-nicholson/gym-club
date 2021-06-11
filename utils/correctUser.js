const correctUser = (req, res, next) => {
    if (req.session.user_id != req.params.id) {
      res.redirect('/');
    } else {
      next();
    }
  };
  
  module.exports = correctUser;