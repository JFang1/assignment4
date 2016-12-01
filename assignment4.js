// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

// referenced: http://api.jquery.com/jquery.getjson/
(function() {
  console.log('Keepin\'n it clean with an external script!');

  $('.predicted-results').hide();

  var returnedData;
  var statusCode;
  var keysArray = [];
  var valsArray = [];

  $.getJSON( "http://www.mattbowytz.com/simple_api.json?data=all", function(data) {
    $.each(data, function(key, val) {
      if (key==="status") {
        statusCode = val;
        console.log(statusCode);
        if (val != 200) {
          alert("Request failed!");
        }
      }
      if (key==="data") {
        returnedData=val;
        console.log("This is the data: ");
        console.log(returnedData);
      }
    });

    if (statusCode == 200) {
      JSON.parse(returnedData);

      // valsArray = returnedData.toString().split(/,| /);
      // var i;
      // for (i=0; i<valsArray.length; i++) {
      //   console.log(valsArray[i].toString());
      // }

      //   "class": "results",
    //    html: items.join( "" )
    //  $('.predicted-results').html(items.toString());
    } // end if (statusCode == 200)

  });


})();


$('.flexsearch-input').keyup(function(){
  var results = [];
  var input = document.getElementById('enteredInput').value;
  if (input == "" || input == null) {
    console.log('Nothing in the flexsearch-input!');
  }
  else {
    console.log(input);
  }
  // if (input == "" || input == null) {
  //   $('.predicted-results').hide();
  // }
  // else {
  //   var mBowytzAPI = "http://www.mattbowytz.com/simple_api.json?data=all";
  //   $.getJSON( mBowytzAPI).done(function( data ) {
  //     $.each( data.items, function( i, item ) {
  //       //$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
  //       if ( i === 3 ) {
  //         return false;
  //       }
  //     });
  //   });

  //$('.predicted-results').show();
})
