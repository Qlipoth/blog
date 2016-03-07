module.exports = function(req, res, next) {


   if (req.isAuthenticated()) {
    console.log('ROLEEEE',req.user.role)
        return next();
    }
    else{
        return res.forbidden('You are not permitted to perform this action.');
    }
};
