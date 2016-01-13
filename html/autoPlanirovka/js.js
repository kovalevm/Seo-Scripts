document.getElementById("go").addEventListener("click", main);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("background.js got a message")
        console.log(request);
        console.log(sender);
        sendResponse("bar");
    }
);

function main(mouseEvent) {
    //делаем масик с ключами
    var keys = document.getElementById('keys').value.split('\n');

    //фильтруем его от пустых строк и пробелов
    for (var i = 0; i < keys.length; i++) {
        keys[i] = trim(keys[i]);
        if (keys[i] === "") {
            keys.splice(i, 1);
            i--;
        }
    };

    chrome.tabs.create({
        url: 'https://yandex.ru/search/?lr=39&text=' + keys[0],
        active: false
    }, function (tab) {
        console.log(tab);



//        setTimeout(function () {
//            console.log('dafa');
//
//        }, 3000);
//        sleep(5000);
//        console.log(tab);
//        setTimeout(function () {
//            console.log(tab);
//            chrome.tabs.remove(tab.id);
//            closeI--;
//            document.getElementById('rest-count-number').innerHTML = closeI;
//        }, 10000)

    });
//    console.log(keys);
//    console.log(keys.length);
}
