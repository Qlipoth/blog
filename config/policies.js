module.exports.policies = {

    // Default policy for all controllers and actions
    // (`true` allows public access)
   '*': ['rememberMeAuth'],

    /**
     * Вставляем для нашего контроллера
     * Admin политику admin.js, которая
     * ограничивает доступ.
     */

    SearchController: {
        '*': true,
    },
    AuthController: {
      '*': ['passport','rememberMeAuth']
    },

    AdminController: {
        '*': ['rememberMeAuth','passport','editor']
    },
    UserController: {
        index: true,
        create: true,
        update: ['passport','rememberMeAuth'],
        settings: 'passport'
    },
    CommentController: {
        '*': ['passport','rememberMeAuth'],
    },
    HomeController:{
      index:['rememberMeAuth']
    },
    PostController: {
        // То что могут видеть все
        index: ['rememberMeAuth'],
        page: ['passport','rememberMeAuth'],
        watch: true,
        // То что может только админ
        create: ['passport','rememberMeAuth','editor'],
        update: ['passport','rememberMeAuth','editor'],
        remove_rec: ['passport','rememberMeAuth','admin'],
    }
};
