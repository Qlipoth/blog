module.exports = {

    attributes: {
        content: {type: 'string', required: false, unique: false},
        post: {
            model : 'post',
        },
        author:{
            model : 'user',
        },
        comments:{
          collection: 'Coment',
          via: 'comment'
      },
       comment: {
            model : 'Coment',
        },
    }
};
