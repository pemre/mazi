/**
 * parses any RSS/XML feed through Google and returns JSON data
 * source: http://stackoverflow.com/a/6271906/477958
 */
function parseRSS(url, container) {
//console.log(document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&callback=?&q=' + encodeURIComponent(url));
	$(container).append('<h2>RSS Yükleniyor...</h2>');

  $.ajax({
    url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      //console.log(data.responseData.feed);
      $(container).html('<h2>'+capitaliseFirstLetter(data.responseData.feed.title)+'</h2>');

      $.each(data.responseData.feed.entries, function(key, value){
        var thehtml = '<h3><a href="'+value.link+'" target="_blank">'+value.title+'</a></h3>'
				+ '<p style="max-width:500px">'+value.contentSnippet+'</p>';
        $(container).append(thehtml);
			//console.log(value);
      });
    }
  });
}

/**
 * Capitalizes the first letter of any string variable
 * source: http://stackoverflow.com/a/1026087/477958
 */
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
