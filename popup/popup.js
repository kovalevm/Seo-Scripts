var browser = get_name_browser();
//console.log(browser);
chrome.storage.local.get('seoChanger.switches', function(result) {
	var seoChanger = result['seoChanger.switches'];
	if ($.isEmptyObject(seoChanger)) {
		console.log('seoChanger is empty');
		seoChanger = null;
	} else {
		seoChanger = JSON.parse(seoChanger);
        //seoChanger = seoChanger.switches;
        console.log(seoChanger);
		jQuery.each(seoChanger, function(key, value) {
			console.log(key + " : " + value);
			if ((value == true) || (value == false)) document.getElementById(key).checked= value ? true : false;
			else document.getElementById(key).value = value;
		});
		if (document.getElementById('bunLogin').value == '') { $('#dopLinks').attr('disabled',true); };
	}
});


$("#bunLogin" ).keyup(function(){
	console.log(document.getElementById("bunLogin").value);
	if (document.getElementById('bunLogin').value == '') { $('#dopLinks').attr('disabled',true); }
	else $('#dopLinks').removeAttr('disabled');

});

$('input').click(function(){
	var seoChanger = new Object();
	var inputs = $('input');
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type == 'checkbox') 	seoChanger[inputs[i].id] = inputs[i].checked;
		else seoChanger[inputs[i].id] = inputs[i].value;

	}
	seoChanger = JSON.stringify(seoChanger);
	chrome.storage.local.set({'seoChanger.switches': seoChanger})
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

$('#cleanBD').click(function () {

    chrome.storage.local.remove('seoChanger.switches', function () {});
});
