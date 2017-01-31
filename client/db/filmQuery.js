var MongoClient = require('mongodb').MongoClient; //lets us talk to mongo using JS for our webapp

var FilmQuery = function() {
  this.url = 'mongodb://localhost:27017/ratings_site';
} ;

FilmQuery.prototype = { 
  all: function (onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      
       var collection = db.collection('films');
       collection.find().toArray(function(err, docs) // this waits until the initial callback has complete as we have converted the data into an Array
        {
          onQueryFinished(docs); 
        });
      
    });
  },

  add: function (data, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      
       var collection = db.collection('films');
       collection.insert(data);
       collection.find().toArray(function(err, docs) // this waits until the initial callback has complete as we have converted the data into an Array
        {
          onQueryFinished(docs); 
        });
      
    });
  },
};

module.exports = FilmQuery;
