$(document).ready(function() {
   //make a function to show the films data when writing inside the input
   $(".searchbar").click(function(){
     //clean the val inside the input
     $(this).val("");
   });
   //make a variable for the Api and the ApiKey
   var api = "https://api.themoviedb.org/3/search/movie";
   var apiKey = "765dd26370a4e82d38aa3ee95f3f61e9";
});
   //FUNCTION
   function PrintMoviesData(films) {
     var source = $("#movies-template")
     console.log(source);
     var template = Handlebars.compile(source);
     console.log(template);
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
        var films = data.response;
        console.log(films);
     },
       "error": function (err) {
        alert("There is an error with the Ajax call. "+ err);

       //make a cicle for to get inside of the api Array objects
       for (var i = 0; i < films.length; i++) {
          var context = {
           //make some property which are going to be inserted in the placeholders
           title: films.title,
           originaltitle: films.original_title,
           language: films.original_language,
           vote: films.vote_average
         };
         //make an html variable with the handlebars context
         var html = template(context);
         //append the html inside the DOM
         $("#movies_list").append(html);
       }
     }
   })
 };
