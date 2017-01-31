
var Film = require('./film');
var Review = require('./review');

var Films = function() {

 }

 Films.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest(); // calling our own api (mongo db)
    request.open("GET", url);
    request.onload = callback;
    request.send();
  },

  makePostRequest: function(url, data, callback){
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    console.log(data);

    request.send(data);
  },

  all: function(callback){
    var self = this;
    this.makeRequest("http://localhost:3000/api/films", function() {
      if (this.status !== 200) {
        return;
      }
      var jsonString = this.responseText; // gets back json string
      var results = JSON.parse(jsonString); // formats it as readable JSON
      // console.log(results);
      var films = self.populateFilms(results); // cant use bind here so its assigned to a variable
      callback(films);

    });
  },
  populateFilms: function(results) {
    var films = [];  //ensures an Array is returned even if empty

    for (var result of results){
      var film = new Film(result);
      films.push(film);
    }

    return films;
  }
 }

module.exports = Films;
