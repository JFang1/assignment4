// Referenced on how to use ajax: http://api.jquery.com/jquery.ajax/
// Referenced for making clickable links to Google: http://www.googleguide.com/linking.html
// Referenced for how to use String.replace(): http://www.w3schools.com/jsref/jsref_replace.asp
// Referenced for how to open a new tab on click: http://stackoverflow.com/questions/13071967/adding-an-onclick-function-to-go-to-url-in-javascript

var returnedData;
var dataArray = [];

// The anonymous function below will fire on page load
(function() {
  $.ajax( { // AirBnb's JavaScript style guide suggests adding an extra space before the opening brace
    dataType: 'json',
    method: 'GET',
    url: 'http://www.mattbowytz.com/simple_api.json?data=all',
    success: function(data) {
      $.each(data, function(key, value) {
        if (key === 'data') {
          returnedData = value;
          $.each(returnedData, function(subKey, subValue) {
            dataArray.push(subKey.toLowerCase()); // might as well push the names of the data categories too!
            $.each(subValue, function(index, element) {
              dataArray.push(element.toLowerCase());
            });
          });
        } // end if
      }) // end each
    }, // end success
    error: function(data) {
      console.log(data);
    } // end error
  }); // end ajax call
  $('.predicted-results').hide();
})(); // end main function


$('.flexsearch-input').keyup(function() {
  var resultsStr = '<ul>';
  var input = document.getElementById('enteredInput').value.toLowerCase();
  var show = 0;

  if (input === '' || input === null) {
    $('.predicted-results').hide();
  }
  else {
    $.each(dataArray, function(dataIndex, dataValue) {
      if (dataValue.startsWith(input)) {
        resultsStr = resultsStr + '<li><a target=\'_blank\' href=\"http://www.google.com/search?q=' + dataValue.replace(/ /g, '+') + '\">' + dataValue + '</li>';
        show = 1;
      }
    });
    resultsStr = resultsStr + '</ul>';
    if (show === 1) {
      $('.predicted-results').html(resultsStr).show();
    }
  } // end else
}); // end keyup handling


$('.flexsearch-submit').click(function() {
  var url = 'http://www.google.com/search?q=';
  url = url + document.getElementById('enteredInput').value.toLowerCase();
  url = url.replace(/ /g, '+');
  window.open(url);
}); // end flexsearch-submit click handler
