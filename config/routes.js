/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /': 'HomeController',
  // 'get /login': {
  //      view: 'login'
  // },
  // 'post /login': 'AuthController.login',

  // '/logout': 'AuthController.logout',
  // '/signup' : 'UserController',
  // '/login'    : 'SessionController',
  // '/register' : 'UserController',

  // '/logout'   : {
  //   controller: 'session',
  //   action: 'destroy'
  // },
'get /login': 'AuthController.login',
'get /logout': 'AuthController.logout',
'get /register': 'AuthController.register',

'post /auth/local': 'AuthController.callback',
'post /auth/local/:action': 'AuthController.callback',

'get /auth/:provider': 'AuthController.provider',
'get /auth/:provider/callback': 'AuthController.callback',
'get /auth/:provider/:action': 'AuthController.callback',

'get /persons': 'HomeController.get_persons',
  /**
   * Здесь мы определяем пути, которые
   * мы хотим переопределить на другой
   * адрес чтобы
   * использовать по назначенному нам
   * по умолчанию пути REST, в нашем
   * случае по-умолчанию контроллер
   * пагинации, использует адрес
   * '/post/page/:page' - что не
   * совсем удобно при использовании,
   * поэтому мы создаем новую конфиг.
   * нужного нам пути. И так первым мы
   * указываем вид запроса get или post,
   * наш случай - мы указываем страницу
   * в адресной строке, поэтому get.
   * Далее мы указываем нужный нам адрес
   * после по типу ':параметр' указываем
   * наш параметр req.param('page'), далее
   * указываем контроллер, и действие
   * которое его будет обрабатывать.
   */

  'get /post/page?page=page': {
    controller: 'post', // Контроллер
    action: 'page' // Действие
  },

  /**
   * Задаем пути так, чтобы все запросы
   * были только POST - это часть организации
   * безопасности приложения помимо политики. Это
   * нужно потому что мы отключаем rest blueprints
   * которые по умолчанию включены (в config/controllers.js)
   */

  'post /post/create': {
    controller: 'post',
    action: 'create'
  },

  'post /post/delete/': {
    controller: 'post',
    action: 'remove_rec'
  },

  'post /post/update': {
    controller: 'post',
    action: 'update'
  },
  'post /to_temp': {
    controller: 'post',
    action: 'uploadToTemp'
  },
   'post /removeFromTemp': {
    controller: 'post',
    action: 'removeFromTemp'
  },


  'post /create_comment'      : 'CommentController.create',
  'post /remove_comment'      : 'CommentController.remove_com',
  'GET /search'               : 'SearchController.index',
  'GET /search/:search_string': 'SearchController.findByParam',
  'post /update_user'         : 'UserController.update',
  'GET /settings'             : 'UserController.settings',
  'post /api/upload/'         : 'APIController.upload',
  'post /api/upload_cropped'  : 'APIController.uploadCropped',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
