module.exports = function(req, res, next) {
    console.log('Редактор',req.user.role.id )
    // if ((_.findIndex(req.user, {id: 1}) !== -1) || (_.findIndex(req.user, {id: 2}) !== -1))
     if (req.user.role.id ===1 || req.user.role.id  ===2 )
    {
        console.log('is editor - true')
        return next();
    }
    else{
        console.log('is editor - false')
        return res.forbidden('You are not permitted to perform this action.');
    }
};
