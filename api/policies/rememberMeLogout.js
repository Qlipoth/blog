/**
 * Remember Me Middleware
 *
 */
module.exports = function (req, res, next) {

      res.clearCookie('remember');
      console.log('logout remember me');
      next();

};
