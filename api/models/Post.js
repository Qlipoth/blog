/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

      title: {
          type: 'text',
          required: true
      },
      description: {
          type: 'text',
          required: true
      },
      content: {
          type: 'text',
          required: true,
      },
      author:{
          model:'user'
      },
      comments:{
          collection: 'Coment',
          via: 'post'
      },
      tags:{
        collection: 'Tag',
        via: 'posts'
      },
      charts:{
        collection: 'Chart',
        via: 'post'
      }

    },

    afterDestroy: function(post, cb){
      var post_id = post[0].id;
      console.log('я удалил вот этот пост: ',post,post_id);
      Coment.destroy({post:post_id})
      .then(function(col){
        console.log(col)
        cb();
        console.log('коментарии удалены!')
      })

    }
};
