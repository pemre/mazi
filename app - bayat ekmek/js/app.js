var db, id, categoryId = "favourite", title, i18n, remote, searchText, temp;

document.addEventListener("deviceready", onDeviceReady, false); // Wait for device API libraries to load
document.addEventListener("backbutton", onClickBack, false); // on click back button

function onDeviceReady() {
	// Prepare FastClick
	Origami.fastclick(document.body);
	// Prepare language settings, also call translateAll()
	getLang();
	// Prepare DB
	openDB();
	// Prepare generic selectors
	$modal = $('#modal');
	$items = $('#items');
	// Prepare UI
	onClickItem();
	onClickSearch();
	onClickCategory();
	onClickLike();
	prepareModal();
}


/************* UI Functions *************/

function onClickBack() {
	// if all modals are closed, exit from the app
	if (remote == "views/exit.html" && ($modal.data('bs.modal') || {}).isShown)
		navigator.app.exitApp();
	else if (($modal.data('bs.modal') || {}).isShown) {
		$modal.modal('hide');
		$('[data-toggle="dropdown"]').parent().removeClass('open');	
	}
	else
		getView('#modal', "exit", true);
}

function onClickItem() {
	$items.on('click', '.list-group-item', function() {
		id = this.id;
		db.transaction(dbGetItem, errorCB);
	})
}

function onClickSearch() {
	$('#search-button').on('click', function(event) {
		searchText = document.getElementById("search-text").value;
		title = '“' + searchText + '”';
		db.transaction(dbSearchItem, errorCB);
		return false;
	});
}

function onClickCategory() {
	$('#category li a').on('click', function(event) {
		categoryId = $(this).attr('id');
		
		if (categoryId == "favourite") {
    		// _('Favourites') not working at first run
    		//title = '<span data-i18n="Favourites"></span>';
			title = _('Favourites');
			db.transaction(dbGetItemsLiked, errorCB);
		}
		else {
			title = $(this).text();
			db.transaction(dbGetCategory, errorCB);
		}
	});
}

function onClickLike() {
	$items.on('click', '.like', function(event) {
		event.stopPropagation();
		id = $(event.target).closest('a').attr('id');
		db.transaction(dbToggleLiked, errorCB);
	});

	$modal.on('click', '#modal-like', function(event) {
		event.stopPropagation();
		db.transaction(dbToggleLiked, errorCB);
	});
}

function prepareModal() {
	$('.popup-links').on('click', function(e) {
		getView('#modal', $(this).data('href'), true);
	});

	// For ingredient checkmarks
	$modal.on('click', '#modal-body-ingredients li', function(event) {
		$(this).toggleClass('pur');
	});
}

/************* View Functions *************/

// OLD USAGE:
//remote = "views/exit.html";
//$('#modal .modal-content').load(remote, function(e) {
//	$modal.translate().modal('show');
//});
function getView(selector, viewName, isModal) {
	var $s = $(selector);
	if (isModal)
		$s.find('.modal-content').html(getCache(viewName)).translate().parent().parent().modal('show');
	else
		$s.html(getCache(viewName)).translate().show();
}


/*********** CACHE FUNCTIONS ****************/
function getCache(viewName) {
	remote = "views/" + viewName + ".html";
	var cache = localStorage.getItem(remote);

	if (cache === null) {
		$.get(remote, function(html) {
			localStorage.setItem(remote, html);
			return html;
		});
	}
	else
		return cache;
}

function getCacheJson(objName) {

	var cache = JSON.parse(localStorage.getItem(objName));

	if (cache === null) {
		temp = objName;
		loadJS(objName, getCacheJsonSuccess, document.body);
	}
	else
		return cache;
}

function getCacheJsonSuccess() {
	localStorage.setItem(temp, JSON.stringify(i18n));
}

var loadJS = function (url, implementationCode, location) {
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;
    location.appendChild(scriptTag);
};
