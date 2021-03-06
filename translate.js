;(function(window, document, $) {
function Translate() {
	Translate.languages = ['ru', 'en', 'zh', 'es', 'ar', 'ja', 'ko', 'de', 'fr', 'tr', 'vi', 'it'];
	Translate.languagesName = ['Русский', 'Английский', 'Китайский', 'Испанский', 'Арабский', 'Японский', 'Корейский', 'Немецкий', 'Французский', 'Турецкий', 'Вьетнамский', 'Итальянский'];
	
	Translate.html = $('<div id="languages"></div>');
};

Translate.start = function(motherTongue) {
	if(!getCookie('MOTHER_TONGUE')) {
		setCookie('MOTHER_TONGUE', motherTongue);
		location.reload();
	} if(!getCookie('CURRENT_LANGUAGE')) {
		setCookie('CURRENT_LANGUAGE', getCookie('MOTHER_TONGUE'));
		location.reload();
	}
};

Translate.run = function(element) {
	if(getCookie('MOTHER_TONGUE') != getCookie('CURRENT_LANGUAGE')) {
		var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
		var key = 'trnsl.1.1.20180325T071558Z.3e77aa9ad1588b1f.d87f8a736bf6409aab3cffeee2bafc4086ac80dd';
		var language = getCookie('CURRENT_LANGUAGE');
		var params = {'key': key, 'lang': language, 'format': 'html'};
		
		$(element).each(function(index, elem) {
			var text = $(elem).html();
			params.text = text;
			$.get(url, params, function(data) {
				if(data.code != 200) alert('При переводе произошла ошибка!');
				else $(elem).html(data.text);
				Translate.setBind();
				$('body').show();
			});
		});
	} else $('body').show();
};

Translate.getForm = function(params) {
	var html = Translate.html;
	var currentLanguage = getCookie('CURRENT_LANGUAGE');
	var currentLanguageName = Translate.getNames()[Translate.getLanguages().indexOf(currentLanguage)];
	html.html('<div id="dropbtn" class="' + currentLanguage + 'Flag">' + currentLanguageName + '</div><div class="dropdown-content"></div>');
	
	if(params.languages == 'all') params.languages = Translate.getLanguages().join();
	var languages = params.languages.split(',');
	var names = Translate.getNames();
	for(var i = 0; i < languages.length; i++) {
		var language = languages[i];
		var name = names[Translate.getLanguages().indexOf(language)];
		if(language == getCookie('CURRENT_LANGUAGE')) var classThis = ' this';
		else var classThis = '';
		html.find('.dropdown-content').append('<b class="' + language + 'Flag' + classThis + '">' + name + '</b>');
	} return html;
};

Translate.setBind = function() {
	$('#languages b').click(function() {
		var language = $(this).attr('class').replace('Flag', '').replace(' this', '');
		setCookie('CURRENT_LANGUAGE', language);
		location.reload();
	});
};


Translate.getLanguages = function() {
	return Translate.languages;
};

Translate.getNames = function() {
	return Translate.languagesName;
};

new Translate();


function setCookie(name, value) {
	document.cookie = name + "=" + value + ';';
};

function getCookie(name) {
	if(!name) return document.cookie;
	var matches = document.cookie.match(new RegExp(
	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

window.Translate = Translate;
})(window, document, jQuery);