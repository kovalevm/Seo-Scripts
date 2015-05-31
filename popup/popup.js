var browser = get_name_browser();
console.log(browser);
chrome.storage.local.get('seoChanger', function(result) {
	var seoChanger = result['seoChanger'];
	if ($.isEmptyObject(seoChanger)) {
		console.log('seoChanger is empty');
		seoChanger = null;
	} else {
		seoChanger = JSON.parse(seoChanger);
		jQuery.each(seoChanger, function(key, value) {
			console.log(key + " : " + value);
			document.getElementById(key).checked= value ? true : false;
		});
	}
});

$('.checkbox-activation').click(function(){
	var seoChanger = new Object();
	var checkboxs = $('.checkbox-activation');
	for (var i = 0; i < checkboxs.length; i++) {
		seoChanger[checkboxs[i].id] = checkboxs[i].checked;
	}
	seoChanger = JSON.stringify(seoChanger);
	chrome.storage.local.set({'seoChanger': seoChanger})
});

function get_name_browser(){
    // получаем данные userAgent
    var ua = navigator.userAgent;    
    // с помощью регулярок проверяем наличие текста,
    // соответствующие тому или иному браузеру
    
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Chrome/) > 0) return 'Google Chrome';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
    // условий может быть и больше.
    // сейчас сделаны проверки только 
    // для популярных браузеров
    return 'Не определен';
}