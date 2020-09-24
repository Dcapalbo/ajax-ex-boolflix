$(document).ready(function() {
   //make a function which at the press enter will insert the data
   $(".films_input").keypress(function() {
    if (event.which == 13) {
      // make a variable which takes the value of the Movies inputs
      var printMovies = $(".films_input").val();
      var printSeries = $(".films_input").val();
      $(".films_input").val("");
      // Invoke a function to clear the DOM
      Clear();
      //invoke the function to print the movies and series data
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
   function conversionVote(vote) {
     //make a variable to fix and divide the vote numbers
     var newVote = Math.ceil(vote / 2);
     //make the handlebars variables
     var source = $("#stars_template").html();
     var template = Handlebars.compile(source);
     var html = template();
     var stars = "";

     for (var i = 0; i < newVote; i++){
       if (i <= newVote) {
         stars += html;
       } else {
         stars += html;
       }
     }
     return stars;
   }
   //make a function to control the presence of the language inside the site and to change it where it's usefull
   function conversionLanguage(language) {
     //make conditions
     if (language == "en") {
       return "gb";
     } else if (language == "ja") {
       return "jp";
     } else {
       return language;
     }
   }
   //make a function searching for the images inside the api
   function SearchImage (image) {
	  image = 'https://image.tmdb.org/t/p/w342/' + image;
	  return image;
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
        //invoke the language function
        conversionLanguage(language);
        //make a cicle for to get inside of the api Array objects
        for (var i = 0; i < results.length; i++) {
           var context = {
            //make some property which are going to be inserted in the placeholders
            "title": results[i].title,
            "originaltitle": results[i].original_title,
            "vote": results[i].vote_average,
            "original_language": language,
            "poster_path": SearchImage(results[i].poster_path)
          }
          //make a variable for the new context value
          var language = results[i].original_language;
          //invoke the conversionVote function
          conversionVote(vote);
          //make a variable to take the vote results and convert it in stars value
          var vote = conversionVote(results[i].vote_average);
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
            "vote": results[i].vote_average,
            "original_language": language,
            "poster_path": SearchImage(results[i].poster_path)
          };
          //invoke the language function
          conversionLanguage(language);
          //make a variable for the new context value
          var language = results[i].original_language;
          // invoke the conversionVote function
          conversionVote(vote);
          //make a variable to take the vote results and convert it in stars value
          var vote = conversionVote(results[i].vote_average);
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
