$(document).ready(function() {
   //make a function to show the films data when writing inside the input
   $(".search_button").click(function(){
     //clean the val inside the input
     $(".films_input").val("");
     // takes the input value
     var searchFilms = $(".films_input").val();
     //invoke the function to print the data
     PrintMoviesData(searchFilms);
     console.log(searchFilms);
     // clean the input again
     $(".films_input").val();
   });
   //make a variable for the Api and the ApiKey
});
   //FUNCTION
   function PrintMoviesData(searchFilms) {
    //make the handlebars variables
    var source = $("#movies_template").html();
    var template = Handlebars.compile(source);
    var api = "https://api.themoviedb.org/3/search/movie";
    var apiKey = "765dd26370a4e82d38aa3ee95f3f61e9";
   //make an ajax call
   $.ajax(
    {
      "url": api,
      "data":{
        "api_key": apiKey,
        "query": "Blade Runner",
        "page": "1",
     },
      "method": "GET",
      "success": function(data) {
        console.log(data);
        var films = data.response;
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
