var getSightings = function(){
  $.ajax({
      url:"/sightings",
      type: "GET",
      dataType: "json"
    }).done(function(response){  
      var source = $("#sighting-info").html();
      var template = Handlebars.compile(source);
      response.forEach(function(sighting){
        $('body').append(template(sighting));
      });
    });
};

var getDemoSightings = function(){
 $.ajax({
    url:"/demo/sightings",
    type: "GET",
    dataType: "json"
  }).done(function(response){ 
  console.log(response) 
    var source = $("#demo-sighting-info").html();
    var template = Handlebars.compile(source);
    response.forEach(function(sighting){
      $('body').append(template(sighting));
    });
  });
};

$(document).ready(function(){

  getSightings();

  $('#view-all-birds-btn').on('click', getDemoSightings)

});