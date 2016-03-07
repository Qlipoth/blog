/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
	sails.moment = require('moment');
  global.passport = require('passport');
  global.Q = require('Q');
  require('q-foreach')(Q);

   global.appRoot = __dirname+'/..';

   global.fs       = require('fs-extra');
  sails.services.passport.loadStrategies();
  Q()
    .then(filler.fillRoles)
    .then(function(roles) {
      console.log('роли заполнены:', roles)
    })
    .then(filler.fillUsers)
    .then(function(users) {
      console.log('юзеры заполнены:', users)
    })
    .then(filler.fillPassports)
    .then(function(passports) {
      console.log('пасспорта заполнены:', passports)
    })
    .then(filler.fillPosts)
    .then(function(posts) {
      console.log('посты заполнены:', posts)
    })
    .then(filler.fillComments)
    .then(function(comments) {
      console.log('коменты заполнены:', comments)
      return cb();
    })
    .catch(function(err) {
      cb(err);
    })
};
