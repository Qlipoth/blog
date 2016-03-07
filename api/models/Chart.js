var Chart = {
    attributes: {
        post : { model: 'Post', required: false },
        data : { type: 'json', 'defaultsTo': '{"name": "", "answers":[]}' }
    }
};

module.exports = Chart;
