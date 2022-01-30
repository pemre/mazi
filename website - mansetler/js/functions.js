var prior = ['t24', 'ihlas', 'trkvz', 'hbrlr', 'itrps', 'bik', 'ozgun'];

function nextItem(num, array) { 
  return array[($.inArray(num, array) + 1) % array.length]; 
}

function sortBy(data) {
	var topLevel = $('li[data-' + data + ']');
	var found = {};
	// store in temp
	$("#temp").html($("#news").html());
	// empty #news
	$("#news").html("");

	// for each of those...
	topLevel.each(function()
	{
		var li = $(this),
		// ... we get its text ...
		title = li.data(data),
		// ... and other li elements with the corresponding title
		children = $('li[data-' + data + '="' + title + '"]');

		// if there are any...
		if (children.length > 0 && !found[title])
		{
			// ... create an empty list ...
			var ul = $('<ul></ul>');
			var h2 = $('<div style="clear:both"></div><h2>' + title + '</h2>');
			// ... fill it and ...
			children.appendTo(ul);
			// ... append it to the original element
			h2.appendTo($("#news"));
			ul.appendTo($("#news"));
			found[title] = true;
		}
	});

	// empty temp
	$("#temp").html("");
}

function getNewspaperRssIfExists(news) {
	if (typeof news['rss'] != 'undefined')
		return '<a href="#rss" class="rsslink" data-link="' + news['rss'] + '" title="Rss oku"><img src="images/rss2.png"></a>';
	else
		return '';
}

function getNewspaperSiteIfExists(news) {
	if (typeof news['site'] != 'undefined')
		return '<a href="' + news['site'] + '" title="Sitesini aç" target="_blank"><img src="images/home2.png"></a>';
	else
		return '';
}

function getNewspaperTempImage(news) {
	var i = 0;
	var template = news[prior[i]];

	while (typeof template == 'undefined') {
		i++;
		//console.log(news);
		template = news[prior[i]];		
	}

	return template;
}

function replaceDate(string) {
	/*$s = preg_replace_callback("/@(d|j)/", create_function('$matches', 'return date($matches[1], time() - 60 * 60 * 24);'), $s);
	return preg_replace_callback("/@(Y|y|m|n)/", create_function('$matches', 'return date($matches[1], time() - 60 * 60 * 24);'), $s);
	$s = preg_replace_callback("/@(d|j)/", create_function('$matches', 'return date($matches[1]);'), $s);
	return preg_replace_callback("/@(Y|y|m|n)/", create_function('$matches', 'return date($matches[1]);'), $s);*/

	var d = new Date();
	string = string.replace(/@j/g, d.getDate());
	string = string.replace(/@n/g, d.getMonth()+1);
	string = string.replace(/@y/g, d.getFullYear().toString().substr(2,2));
	string = string.replace(/@d/g, ("0" + d.getDate()).slice(-2));
	string = string.replace(/@m/g, ("0" + (d.getMonth()+1)).slice(-2));
	return   string.replace(/@Y/g, d.getFullYear());
}

function loadImage(news, id) {
	var url = $("#_newspaperImage"+id).attr("href");

	$.each(news, function(key, value) {
		if (url == value)
			curr = key;
	});
	var next = nextItem(curr, prior);
	var currLink = replaceDate(news[curr]);

	var img = new Image();
	img.onerror = function (evt){
		$("#_newspaperImage"+id).attr("href", news[next]);
		loadImage(news, id);
	}
	img.onload = function (evt){ // success
		$("#_newspaperImage"+id).attr("href", currLink);
	}
	img.src = currLink;
}
