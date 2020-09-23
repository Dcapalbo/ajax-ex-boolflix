$(document).ready(function() {
//   Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).

   $(".films_input").keypress(function() {
    if (event.which == 13) {
      // make a variable which takes the value of the Movies inputs
      var printMovies = $(".films_input").val();
      var printSeries = $(".films_input").val();
      $(".films_input").val("");
      // Invoke a function to clear the DOM
      Clear();
      //invoke the function to print the movies data
      PrintMoviesData(printMovies);
      PrintSeriesData(printSeries);
    }
   });

   //make a function to show the films data when writing inside the input
   $(".search_button").click(function(){
     // make a variable which takes the value of the Movies inputs
     var printMovies = $(".films_input").val();
     var printSeries = $(".films_input").val();
     $(".films_input").val("");
     // Invoke a function to clear the DOM
     Clear();
     //invoke the function to print the movies data
     PrintMoviesData(printMovies);
     PrintSeriesData(printSeries);
   });

});
   //FUNCTIONS
   //make a function which conver the votes in stars
   function convert(vote) {
     //make a variable to fix and divide the vote numbers
     var newVote = Math.ceil(vote / 2);
     //make the handlebars variables
     var source = $("#stars-template").html();
     var template = Handlebars.compile(source);
     var html = template();
     var stars = "";

     for (var i = 0; i < newVote; i++){
       stars += html;
     }
     return stars;
   }
   //make a function to print movies Data inside the DOM
   function PrintMoviesData(printMovies) {
    //make the handlebars variables
    var source = $("#movies_template").html();
    var template = Handlebars.compile(source);
    //make a variable for the Api and the ApiKey
    var api = "https://api.themoviedb.org/3/search/movie";
    var apiKey = "765dd26370a4e82d38aa3ee95f3f61e9";
   //make an ajax call
   $.ajax(
    {
      "url": api,
      "data":{
        "api_key": apiKey,
        "query": printMovies,
        "page": "1",
     },
      "method": "GET",
      "success": function(data) {
        var results = data.results;
        //make a cicle for to get inside of the api Array objects
        for (var i = 0; i < results.length; i++) {
           var context = {
            //make some property which are going to be inserted in the placeholders
            "title": results[i].title,
            "originaltitle": results[i].original_title,
            "language": results[i].original_language,
            "vote": results[i].vote_average
          };
          // invoke the conver function
          convert(vote);
          //make a variable to take the vote results and convert it in stars value
          var vote = convert(results[i].vote_average);
          $("#movies_list").append(vote);
          //make an html variable with the handlebars context
          var html = template(context);
          //append the html inside the DOM
          $("#movies_list").append(html);
        }
      },
       "error": function (err) {
        alert("There is an error with the Ajax call. "+ err);
     }
  });
};
   //make a function to print series Data inside the DOM
   function PrintSeriesData(printSeries) {
    //make the handlebars variables
    var source = $("#series_template").html();
    var template = Handlebars.compile(source);
    //make a variable for the Api and the ApiKey
    var api = "https://api.themoviedb.org/3/search/tv";
    var apiKey = "765dd26370a4e82d38aa3ee95f3f61e9";
   //make an ajax call
   $.ajax(
    {
      "url": api,
      "data":{
        "api_key": apiKey,
        "query": printSeries,
        "page": "1",
     },
      "method": "GET",
      "success": function(data) {
        var results = data.results;
        //make a cicle for to get inside of the api Array objects
        for (var i = 0; i < results.length; i++) {
           var context = {
            //make some property which are going to be inserted in the placeholders
            "name": results[i].name,
            "originalname": results[i].original_name,
            "language": results[i].original_language,
            "vote": results[i].vote_average
          };
          // invoke the convert function
          convert(vote);
          //make a variable to take the vote results and convert it in stars value
          var vote = convert(results[i].vote_average);
          $("#series_list").append(vote);
          //make an html variable with the handlebars context
          var html = template(context);
          //append the html inside the DOM
          $("#series_list").append(html);
        }
      },
       "error": function (err) {
        alert("There is an error with the Ajax call. "+ err);
     }
   });
   };
   //make a function to clear the ul inside the DOM
   function Clear() {
     $("#movies_list li").remove();
     $("#series_list li").remove();
   };
