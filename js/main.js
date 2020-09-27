$(document).ready(function(){
  //make an event function which at the press enter will insert the data
  $(".films_input").keypress(function(event) {
   if (event.which == 13) {
     // make some variables which takes the value of the inputs data
     var printValue = $(".films_input").val();
     $(".films_input").val("");
     // Invoke a function to clear the DOM
     Clear();
     //invoke the function to print movies and series data inside the DOM
     PrintInputsData(printValue);
   }
 });
  //make an event function to show the films data when writing inside the input
  $(".search_button").click(function(){
    // make some variables which takes the value of the inputs data
    var printValue = $(".films_input").val();
    $(".films_input").val("");
    // Invoke a function to clear the DOM
    Clear();
    //invoke the function to print movies and series data inside the DOM
    PrintInputsData(printValue);
  });
});
  //FUNCTIONS
  //make a function which convert the votes in stars
  function conversionVote(vote) {
    //make a variable to fix and divide the vote numbers
    var newVote = Math.ceil(vote / 2);
    // make empty stars variable
    var fullStar ="<i class='fas fa-star'></i>";
    var emptyStar ="<i class='far fa-star'></i>";
    var stars = "";
    // make a cicle "for" to create the stars
    for (var i = 0; i <= 5; i++){
      if (i <= newVote) {
        var star = fullStar;
      } else {
        var star = emptyStar;
      }
    }
    // make a return of stars
    return stars;
  }
  //make a function which takes the
  //make a function to clear the ul inside the DOM
  function Clear() {
    $("#movies_list li, h1, h3").remove();
    $("#series_list li, h1, h3").remove();
  }
  //make a function searching for the images inside the api
  function SearchImage (image) {
    if (image !== null) {
    image = 'https://image.tmdb.org/t/p/w342/' + image;
  } else if (image == null) {
    image = "img/no_poster.png";
  }
  return image
 }
  //make a function to print movies Data inside the DOM
  function PrintInputsData(search) {
   //make the handlebars variables
   var source = $("#movies_template").html();
   var template = Handlebars.compile(source);
   //make a variable for the Api and the ApiKey
   var apiKey = "765dd26370a4e82d38aa3ee95f3f61e9";
   //make an ajax call for the series
   $.ajax(
     {
      "url": "https://api.themoviedb.org/3/search/tv",
      "data":{
       "api_key": apiKey,
       "query": search,
       "page": "1",
     },
      "method": "GET",
      "success": function(data) {
        var results = data.results;
        //make a cicle for to get inside of the api Array objects
        for (var i = 0; i < results.length; i++) {
         var context = {
         //make some property which are going to be inserted in the placeholders
         "title": results[i].title || results[i].name,
         "originaltitle": results[i].original_title || results[i].original_name,
         "overview": results[i].overview,
         "idActors": results[i].id || results[i].id,
         "genre": results[i].genre,
         "vote": conversionVote(results[i].vote_average),
         "poster_path": SearchImage(results[i].poster_path),
         "original_language": language
     };
      var language = results[i].original_language;
      //make a variable to take the vote results and convert it in stars value
      var vote = conversionVote(results[i].vote_average);
      //make an html variable with inside the handlebars context
      var html = template(context);
      //append the stars inside the DOM
      $("#series_list").append(vote);
      //append the html inside the DOM
      $("#series_list").append(html);
     }
    },
      "error": function (err) {
       alert("There is an error with the Ajax call. "+ err);
     }
  });
  //make an ajax call for the movies
  $.ajax(
     {
      "url": "https://api.themoviedb.org/3/search/movie",
      "data":{
        "api_key": apiKey,
        "query": search,
        "page": "1",
     },
       "method": "GET",
       "success": function(data) {
        var results = data.results;
        //make a cicle for to get inside of the api Array objects
        for (var i = 0; i < results.length; i++) {
         var context = {
         //make some property which are going to be inserted in the placeholders
         "title": results[i].title || results[i].name,
         "originaltitle": results[i].original_title || results[i].original_name,
         "overview": results[i].overview,
         "idActors": results[i].id || results[i].id,
         "genre": results[i].genre,
         "vote": conversionVote(results[i].vote_average),
         "poster_path": SearchImage(results[i].poster_path),
         "original_language": language
       }
       var language = results[i].original_language;
       //make a variable to take the vote results and convert it in stars value
       var vote = conversionVote(results[i].vote_average);
       //make an html variable with inside the handlebars context
       var html = template(context);
       //append the stars inside the DOM
       $("#movies_list").append(vote);
       //append the html inside the DOM
       $("#movies_list").append(html);
      }
     },
      "error": function (err) {
       alert("There is an error with the Ajax call. "+ err);
     }
   });
}
