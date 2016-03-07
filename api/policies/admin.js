module.exports = function(req, res, next) {
  console.log('role',req.user.role)
   if (req.user.role===1) {
        console.log('is admin - true')
        return next();
    }
    else{
        console.log('is admin - false')
        return res.forbidden('You are not permitted to perform this action.');
    }
};
