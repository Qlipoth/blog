module.exports.http = {
   middleware: {

    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),

    setLocals : function(req, res, cb) {
            res.locals.user = req.user || {};
            cb();
        },

     order: [
            'startRequestTimer',
            'cookieParser',
            'session',
            'passportInit',
            'passportSession',
            'setLocals',
            'myRequestLogger',
            'bodyParser',
            'handleBodyParserError',
            'compress',
            'methodOverride',
            'poweredBy',
            'router',
            'www',
            'favicon',
            '404',
            '500'
          ],
     }
};
