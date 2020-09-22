$(document).ready(function() {

//FUNCTION
var api = "https://api.themoviedb.org/3/search/movie?api_key=765dd26370a4e82d38aa3ee95f3f61e9&language=en-US&query=blade%20runner&page=1&include_adult=false";
var source = $("#movies-template")
var template = Handlebars.compile(source);
function renderMoviesData(data) {
  //make a variable for the API
  //make an ajax call
  $.ajax(
   {
     "url": api,
     "method": "GET",
     "success": function(data) {
       console.log(data);
       for (var i = 0; i < data.length; i++) {
         var context = {
          title: data.title,
          originaltitle: data.originaltitle,
          language: data.language,
          vote: data.vote
         };
         var html = template(context);
         $("#movies_list").append(html);
       }
    },
      "error": function (err) {
       alert("There is an error with the Ajax call. "+ err);
      }
    });
 }
});
