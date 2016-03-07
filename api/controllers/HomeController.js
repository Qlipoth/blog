module.exports = {
    index : function(req, res){
      res.render('home/index');
    },

    get_persons: function(req, res) {

        var str = req.param('search');
        console.log(str)
        var persons = [{
            name: "Adnan Sagar",
            image: "adnan.png"
        },
        {
            name: "Adronik Sagar",
            image: "adnan.png"
        },
        {
            name: "Adik Rtd",
            image: "avatar.png"
        },
        {
            name: "Rena Cugelman",
            image: "rena.png"
        }, {
            name: "Tavis Lochhead",
            image: "tavis.png"
        }, {
            name: "Brain Cugelman",
            image: "brian.png"
        }];
        var results = persons.filter(function(p) {
            return p.name.indexOf(str) !== -1;
        });
        console.log(results)
        res.send(results);
    }

};
