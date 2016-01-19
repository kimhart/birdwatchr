angular.module('BirdApp').controller('BirdsController', BirdsController);

function BirdsController(){

  var sightings = this;

  sightings.all = [];

  sightings.fetch = function(){
    $.ajax({
      type: "GET",
      url: 'https://randomuser.me/api/',
      dataType: 'json'
      }).done(function(data){
      users.all.push(data.results[0].user.name.first);
      });
    };


// DONT USE THIS BUT USE SIMILAR STUFF
//   var getSightings = function(){
//   $.ajax({
//       url:"/sightings",
//       type: "GET",
//       dataType: "json"
//     }).done(function(response){  
//       var source = $("#sighting-info").html();
//       var template = Handlebars.compile(source);
//       response.forEach(function(sighting){
//         $('body').append(template(sighting));
//       });
//     });
// };

// var getDemoSightings = function(){
//  $.ajax({
//     url:"/demo/sightings",
//     type: "GET",
//     dataType: "json"
//   }).done(function(response){ 
//   console.log(response) 
//     var source = $("#demo-sighting-info").html();
//     var template = Handlebars.compile(source);
//     response.forEach(function(sighting){
//       $('body').append(template(sighting));
//     });
//   });


};
