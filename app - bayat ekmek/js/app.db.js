/************* DB Query Functions *************/
function openDB() {
    db = window.openDatabase("Database", "1.0", "Bayat Ekmekli Tarifler", 200000);

	// First run?
	if (localStorage.getItem("firstRun") == null) {
		db.transaction(populateDB, errorCB);
		localStorage.setItem("firstRun", false);
	}

	title = _('Favourites');
	db.transaction(dbGetItemsLiked, errorCB);
}

function dbGetAllItems(tx) {
    tx.executeSql('SELECT * FROM Tarifler', [], getItems, errorCB);
}

function dbGetItem(tx) {
	tx.executeSql('SELECT * FROM Tarifler WHERE id ='+id, [], getItem, errorCB);
}

function dbGetItemsLiked(tx) {
	tx.executeSql('SELECT * FROM Tarifler WHERE favori = 1', [], getItems, errorCB);
}

function dbSearchItem(tx) {
	tx.executeSql("SELECT * FROM Tarifler where ad like ('%"+ searchText + "%')", [], getItems, errorCB);
}

function dbGetCategory(tx) {
	// Don't forget to use " char for strings! Ex: category = "Example"
	tx.executeSql('SELECT * FROM Tarifler WHERE category ="'+categoryId +'"', [], getItems, errorCB);
}

function dbToggleLiked(tx) {
	tx.executeSql('UPDATE Tarifler SET favori = 1 - favori WHERE id ='+id, [], toggleLiked, errorCB);
}

// DB error function
function errorCB(err) {
	alert("SQL ERROR: "+err+"\nCODE: "+err.code);
}

/************* DB Show Results Functions *************/
function getItems(tx, results) {
    var len = results.rows.length;
    
    if (categoryId == "favourite" && len == 0) {
		getView('#items', "nofav", false);
		return;
    }

	var item, liked, list = '';
	for (var i=0; i<len; i++) {
		item = results.rows.item(i);
		liked = (item.favori) ? 'btn-danger':''; 
		list +=
		'<a href="#" id="' + item.id + '" class="list-group-item clearfix">' +
			'<img src="images/recipes/' + item.resim + '" width="50" class="img-rounded" />' +
			'<strong class="list-title">' + item.ad + '</strong>'+
			'<span class="pull-right list-tags">'+
				'<button type="button" class="btn btn-info btn-xs btn-responsive">'+
					'<span class="glyphicon glyphicon-cutlery"></span>'+
					'<strong>&nbsp;' + item.kackisi + '</strong>'+
				'</button> '+
				'<button type="button" class="btn btn-warning btn-xs btn-responsive">'+
					'<span class="glyphicon glyphicon-time"></span>'+
					'<strong>&nbsp;' + item.sure + '′</strong>'+
				'</button> '+
				'<button type="button" class="btn '+liked+' btn-xs btn-responsive like" id="like' + item.id + '">'+
					'<span class="glyphicon glyphicon-heart"></span>'+
				'</button>'+
			'</span>'+
		'</a>';
    }
    $items.empty().append('<h4>' + title + '</h4>' + list);
}

function getItem(tx, results) {

	var item = results.rows.item(0);

    remote = "views/recipe.html";
    $('#modal .modal-content').load(remote, function(e) {
		$("#modal-title").html(item.ad);
		if (item.sahibi)
			$("#modal-author").html(item.sahibi);
		$("#modal-image").css("background-image", "url(images/recipes/" + item.resim + ")");
		$("#modal-person").html(item.kackisi);
		$("#modal-time").html(item.sure);
		if (item.favori)
			$("#modal-like").addClass('btn-danger');
		$("#modal-body-ingredients").html("<li>" + item.malzeme.replace(/\n/g,"</li><li>") + "</li>");
		$("#modal-body-directions").html("<li>" + item.hazirlanis.replace(/\n/g,"</li><li>") + "</li>");
        $modal.translate().modal('show');
    });
}

function toggleLiked(tx, results) {
	$('#like' + id).toggleClass('btn-danger');
	// if heart on the modal clicked, then:
	$("#modal-like").toggleClass('btn-danger');
}

