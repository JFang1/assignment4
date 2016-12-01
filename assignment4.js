// $.on(); for event handling
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

// Referenced on how to use ajax: http://api.jquery.com/jquery.ajax/
// Referenced for making clickable links to Google: http://www.googleguide.com/linking.html
// Referenced for how to use String.replace(): http://www.w3schools.com/jsref/jsref_replace.asp


var returnedData;
var dataArray = [];

// The anonymous function below will fire on page load
(function() {

  $.ajax({
    dataType: 'json',
    method: 'GET',
    url: 'http://www.mattbowytz.com/simple_api.json?data=all',
    success: function(data){
      $.each(data, function(key, value){
        if (key === 'data') {
          returnedData = value;
          $.each(returnedData, function(subKey, subValue) {
            dataArray.push(subKey.toLowerCase()); // might as well push the names of the data categories too!
            $.each(subValue, function(index, element){
              dataArray.push(element.toLowerCase());
            });
          });
        } // end if
      }) // end each
    }, // end success
    error: function(data){
      console.log(data);
    } // end error
  }); // end ajax call

  $('.predicted-results').hide();

})(); // end main function

$('.flexsearch-input').keyup(function(){

  var resultsStr = "<ul>";
  var input = document.getElementById('enteredInput').value.toLowerCase();

  if (input == "" || input == null) {
    console.log('Nothing in the flexsearch-input!');
    $('.predicted-results').hide();
  }
  else {
    console.log('Input: ' + input);
    $.each(dataArray, function(dataIndex, dataValue){
      if (dataValue.startsWith(input)) {
        resultsStr = resultsStr + '<li><a target=\'_blank\' href=\"http://www.google.com/search?q=' + dataValue.replace(/ /g, '+') + '\">' + dataValue + '</li>';
        console.log(dataValue);
      }
    });

    resultsStr = resultsStr + "</ul>";

    $('.predicted-results').html(resultsStr).show();
  }

}) // end keyup handling
