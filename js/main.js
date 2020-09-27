$(document).ready(function(){
  // //make a function which at the click, will ask with a prompt for the users data
  // $("subscribe_button").click(function(){
  //   var email = prompt("insert your email");
  //   if (email == emailsArray) {
  //     alert("This email already exists, please insert an other one");
  //   } else if (email !== emailsArray) {
  //     var name = prompt("insert your name");
  //     var surname = prompt("insert your surname");
  //   }
  // });
  //make an event function which at the press enter will insert the data
  $(".films_input").keypress(function(event) {
   if (event.which == 13) {
     // make some variables which takes the value of the inputs data
     var dataValue = $(".films_input").val();
     $(".films_input").val("");
     // Invoke a function to clear the DOM
     Clear();
     //invoke the function to print movies and series data inside the DOM
     InputsData("movie", dataValue);
     InputsData("tv", dataValue);
   }
 });
  //make an event function to show the films data when writing inside the input
  $(".search_button").click(function(){
    // make some variables which takes the value of the inputs data
    var dataValue = $(".films_input").val();
    $(".films_input").val("");
    // Invoke a function to clear the DOM
    Clear();
    //invoke the function to print movies and series data inside the DOM
    InputsData("movie", dataValue);
    InputsData("tv", dataValue);
  });
});
  //FUNCTIONS
  //make a function which convert the votes in stars
  function printStars(num) {
   // converting the vote number with a number from 1 to 5
   var num = Math.ceil(num / 2);
   var stars = "";
   for (var i = 1; i <= 5; i++) {
    if(i <= num) {
      stars += "<i class='fas fa-star'></i>";
    } else {
      stars += "<i class='far fa-star'></i>";
    }
  }
  return stars;
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
  //make a function to clear the ul inside the DOM
  function Clear() {
    $("#movies_list li, h1, h3").remove();
    $("#series_list li, h1, h3").remove();
  }
  //make a function which search for the cast inside the Api
  function renderCast(type, castResults) {
  $.ajax(
    {
      "url":"https://api.themoviedb.org/3/"+type+"/"+castResults+"/credits?api_key=765dd26370a4e82d38aa3ee95f3f61e9",
      "method":"GET",
      "success": function (data) {
        var cast = "";
        for (var i = 0; i <= 5; i++) {
          cast += data.cast[i].name + " ";
        }
        return cast;
      },
      "error":function (err) {
        alert("E avvenuto un errore. "+ err);
      }
  });
}

  //make a function to print movies Data inside the DOM
  function InputsData(type, search) {
   //make a variable for the Api and the ApiKey
   var apiKey = "765dd26370a4e82d38aa3ee95f3f61e9";
    //make an ajax call for the series and movies
   $.ajax(
     {
      "url": "https://api.themoviedb.org/3/search/"+type+"",
      "data": {
       "api_key": apiKey,
       "query": search,
       "language": "it-IT",
     },
      "method": "GET",
      "success": function(data) {
        var results = data.results;
        renderResults(type, results);
        //make a function to print the movie and series data inside the DOM
        function renderResults(type, results) {
         //make the handlebars variables
         var source = $("#movies_template").html();
         var template = Handlebars.compile(source);
         //make a cicle for to get inside of the api Array objects
         for (var i = 0; i < results.length; i++) {
           //make some variables for the conditions
           var title, original_title, container;
           //make some conditions to separate the different results which came from the Api
           if(type == "movie") {
            title = results[i].title;
            original_title = results[i].original_title;
            container = $("#movies_list");
           } else if(type == "tv") {
            title = results[i].name;
            original_title = results[i].original_name;
            container = $("#series_list");
           }
         // prepare the context for the append inside the DOM
         var context = {
           "title": title,
           "original title": original_title,
           "overview": results[i].overview,
           "cast": renderCast(type, castResults),
           "genre": genres,
           "vote": vote,
           "poster_path": image,
           "original_language": results[i].original_language
         };
          //make a variable usefull to invoke the genre function later
          var genres = getGenres(results[i].genres);
          //make a variable usefull to invoke the cast function later
          var castResults = results[i].id;
          // invoke and transform the printStars function into a variable
          var vote = printStars(results[i].vote_average);
          // invoke and transform the SearchImage function into a variable
          var image = SearchImage(results[i].poster_path);
          //make an html variable with inside the handlebars context
          var html = template(context);
          //append the html inside the DOM
          container.append(html);
        } console.log(html);
        }
      },
      "error": function (err) {
       alert("There is an error with the Ajax call. "+ err);
      }
    });
}
