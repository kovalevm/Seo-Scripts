document.getElementById("go").addEventListener("click", openTabs);

function openTabs(mouseEvent, service) {


    var urls = document.getElementById('urls');
    urls = urls.value.split('\n');

//    var errors = document.getElementById('errors');
//    var errorsHeader = '<h3>Сначала исправьте следующие ошибки:</h3>'
//    errors.innerHTML = errorsHeader;
//
//    //валидация
//    for (j = 0; j < urls.length; j++) {
//        //console.log(urls[j]);
//        urls[j] = trim(urls[j]);
//
//        if (urls[j].indexOf('http') !== 0 || urls[j].indexOf(' ') !== -1) {
//
//            //если пустая строка то игнорируем её
//            if (urls[j] === '') continue;
//
//            errors.innerHTML += 'Ошибка в строке ' + (j + 1) + '<br>';
//        }
//    }
//
//    //Выходим если есть ошибки
//    if (errors.innerHTML !== errorsHeader) return;
//    errors.innerHTML = '';



    var j = 0;
    var closeI = urls.length;
    (function () {
        if (j < urls.length && !stop) {
            chrome.tabs.create({
                url: ('https://www.google.ru/search?q=купить+теплый+пол&newwindow=1&gbv=2&sei=JTp9VoXfGsTnswG716GYDg#newwindow=1&q=' + urls[j]),
                active: false
            }, function (tab) {

                setTimeout(function () {
                    console.log(tab);
                    chrome.tabs.remove(tab.id);
                    closeI--;
                }, 10000)

            });
            j++;

            setTimeout(arguments.callee, 5000);

        } else {
            alert('Закончили');

        }
    })();

}

function stop() {
    stop = true;
   // console.log(stop)
}

function run() {
    stop = false;
    //console.log(stop)
}

function toggle(el) {
    el.style.display = (el.style.display == 'none') ? 'block' : 'none'
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
