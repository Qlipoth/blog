/**
 * rememberMeAuth
 */
module.exports = function(req, res, next) {
    if (req.session.authenticated) {
        return next();
    } else {

        var rememberToken = req.cookies['remember'];

        if (rememberToken) {
            console.log('найден токен!')
            // console.log(rememberToken);
            // return passport.authenticate('remember-me', function(err, user) {
            //     if (err || !user) {
            //         console.error('remember-me verify:', err);
            //         return passport.logout(req, res, cb);
            //     }
            //     return passport.login(req, res, user, cb);
            // })(req, res, cb);
            var query = {
                  rememberToken: rememberToken
            };

            Passport.findOne(query).populate('user').exec(function (err, passport_str) {
                  console.log('passport');
                  console.log(passport_str);
                  if (err) {
                        return next();
                  }
                  if (!passport_str) {
                        return next();
                  }

                  req.session.authenticated = true;
                  req.session.user = passport_str.user;
                  var user = passport_str.user;
                  // passport.login(req, res, user, next);
                  return passport.login(req, res, user, next);
            });
        } else {
            return next();
        }
    }
};
