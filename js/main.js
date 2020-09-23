$(document).ready(function() {
//   Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

   //make a function to show the films data when writing inside the input
   $(".films_input").click(function(){
     // takes the input value
     $(".films_input").val("");
     var printMovies = $(".films_input").val();
     //invoke the function to print the data
     PrintMoviesData(printMovies);
     // Invoke a function to clear the DOM
     Clear();
     // clear the input again
     $("films_input").remove(printMovies);
   });
   //make a variable for the Api and the ApiKey
});
   //FUNCTION
   function PrintMoviesData(printMovies) {
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
     $("#movies_list").remove("li");
   }
