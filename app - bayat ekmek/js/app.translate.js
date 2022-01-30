function getLang() {
	navigator.globalization.getLocaleName(
		function (locale) {
			var lang = locale.value.split("-")[0];
			if (lang == "tr") {
				//loadJS('locale/tr.js', translateAll, document.body);
				i18n = getCacheJson('locale/tr.js');
			}
			else
				//loadJS('locale/en.js', translateAll, document.body);
				i18n = getCacheJson('locale/en.js');
			translateAll();
		},
		function () { alert('Error getting language') }
	);
}

function _(s) {
	if (typeof(i18n)!='undefined' && i18n[s]) {
		return i18n[s];
	}
	return s;
}

function translateAll() {
	var t = document.querySelectorAll('[data-i18n]'), i, text;
	for (i = 0; i < t.length; ++i) {
		text = _(t[i].getAttribute('data-i18n'));
		switch(t[i].tagName) {
			case "A":     t[i].href        = text; break;
			case "INPUT": t[i].placeholder = text; break;
			default:      t[i].innerHTML   = text; break;
		}
	}
}

function translate(selector) {
	var t = document.querySelectorAll(selector +' [data-i18n]'), i, text;
	for (i = 0; i < t.length; ++i) {
		text = _(t[i].getAttribute('data-i18n'));
		switch(t[i].tagName) {
			case "A":     t[i].href        = text; break;
			case "INPUT": t[i].placeholder = text; break;
			default:      t[i].innerHTML   = text; break;
		}
	}
}

$.fn.extend({
	translate: function() {
		var text;
		this.find('[data-i18n]').each(function(index, value){
			text = _($(this).attr('data-i18n'));
			switch($(this).prop("tagName")) {
				case "A":     $(this).attr("href", text); break;
				case "INPUT": $(this).attr("placeholder", text); break;
				default:      $(this).html(text); break;
			}
		});
		return this;
	}
});

