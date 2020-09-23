$(document).ready(function() {
   //make a function to show the films data when writing inside the input
   $(".search_button").click(function(){
     // takes the input value
     var printMovies = $(".films_input").val();
     $(".films_input").val("");
     // Invoke a function to clear the DOM
     Clear();
     //invoke the function to print the data
     PrintMoviesData(printMovies);
   });

   $(".films_input").keypress(function() {
    if (event.which == 13) {
      // takes the input value
      var printMovies = $(".films_input").val();
      $(".films_input").val("");
      // Invoke a function to clear the DOM
      Clear();
      //invoke the function to print the data
      PrintMoviesData(printMovies);
    }
   });
});
   //FUNCTION
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
        var films = data.results;
        //make a cicle for to get inside of the api Array objects
        for (var i = 0; i < films.length; i++) {
           var context = {
            //make some property which are going to be inserted in the placeholders
            "title": films[i].title,
            "originaltitle": films[i].original_title,
            "language": films[i].original_language,
            "vote": films[i].vote_average
          };
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
   //make a function to clear the ul inside the DOM
   function Clear() {
     $("#movies_list li").remove();
   };
