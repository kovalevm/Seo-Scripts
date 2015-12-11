document.getElementById("yandexAddURL").addEventListener("click", openTabs);
document.getElementById("vkontakte").addEventListener("click", openTabs);
document.getElementById("odnoklassniki").addEventListener("click", openTabs);
document.getElementById("twitter").addEventListener("click", openTabs);
document.getElementById("facebook").addEventListener("click", openTabs);


function openTabs(mouseEvent, service) {

    if (!service) service = this.id;

    var urls = document.getElementById('urls');
    urls = urls.value.split('\n');

    var errors = document.getElementById('errors');
    var errorsHeader = '<h3>Сначала исправьте следующие ошибки:</h3>'
    errors.innerHTML = errorsHeader;

    //валидация
    for (j = 0; j < urls.length; j++) {
        console.log(urls[j]);
        urls[j] = trim(urls[j]);

        if (urls[j].indexOf('http') !== 0 || urls[j].indexOf(' ') !== -1) {

            //если пустая строка то игнорируем её
            if (urls[j] === '') continue;

            errors.innerHTML += 'Ошибка в строке ' + (j + 1) + '<br>';
        }
    }

    //Выходим если есть ошибки
    if (errors.innerHTML !== errorsHeader) return;
    errors.innerHTML = '';

    var linkTmp = '';
    if (service === 'yandexAddURL')
        linkTmp = 'https://webmaster.yandex.ru/addurl.xml?url=';
    else
        linkTmp = 'https://share.yandex.net/go.xml?service=' + service + '&url=';

    if (service === 'yandexAddURL') {
        for (j = 0; j < urls.length; j++) {
            window.open((linkTmp + urls[j]), '_blank');
        }
    } else {

        var j = 0;
        id = 19543;
        (function () {
            if (j < urls.length) {
                chrome.tabs.create({url: (linkTmp + urls[j]), active: false}, function(tab){

                    setTimeout(function() {
                        chrome.tabs.remove(tab.id);
                    }, 10000)

                });

//                window.open((linkTmp + urls[j]), '_blank');
                j++;
                id++;
                setTimeout(arguments.callee, 5000);
            } else {
                /*alert('Закончили');*/
            }
        })();


    }

}

function trim(str, charlist) { // Strip whitespace (or other characters) from the beginning and end of a string
    //
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +	  input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
    return str.replace(re, '');
}
