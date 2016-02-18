document.getElementById("go").addEventListener("click", main);

$('h2.key').click(function() {alert('fda')})

//$('h2.key').click(function() {
//    console.log(this);
////    $('div.snippetsBlock[number="' this.a '"]')
//})

function main(mouseEvent) {
    //делаем массив с ключами
    var keys = document.getElementById('keys').value.split('\n');

    //фильтруем его от пустых строк и пробелов
    for (var i = 0; i < keys.length; i++) {
        keys[i] = trim(keys[i]);
        if (keys[i] === "") {
            keys.splice(i, 1);
            i--;
        }
    };

    //создаем новую вкладку с поиском с первым запросом
    var searchTabId = -1;
    chrome.tabs.create({
        url: 'https://yandex.ru/search/?lr=39&text=' + keys[0],
        active: false
    }, function (tab) {
        searchTabId = tab.id;
    });

    //слушаем runtime.onMessage, когда приходит связка (фраза + жирные слова) -
    //добавляем её в keysAndBoldWords и обновляем странцу с поиском на следующий запрос,
    //когда запросы заканчиваются, распечатываем результат
    var keysAndBoldWords = {};
    var keysCounter = 0;
    var resultTable = '';
    var issues = '';
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
//            console.log("Получили:")
            console.log(request);
            /*console.log(sender);*/

//            resultTable += '<div class="row">';
//
//            resultTable += '<div class="col-lg-1 number">' + keysCounter + '</div>';
//            resultTable += '<div class="col-lg-5 phrase">' + request.query + '</div>';
//            resultTable += '<div class="col-lg-3 addWords">' + request.data.boldWords + '</div>';
//            resultTable += '<div class="col-lg-1 commerce">' +  '</div>';
//            resultTable += '<div class="col-lg-1 internal">'
//                + request.data.mainPageCount + '/' + request.data.internalPageCount
//                + '</div>';
//            resultTable += '<div number="' + keysCounter + '" class="col-lg-1 issue">Нажми</div>';
//
//            resultTable += '</div>';

            resultTable += '<tr number="' + keysCounter + '">';

            resultTable += '<td class="number col-lg-1">' + (keysCounter+1) + '</td>';
            resultTable += '<td class="phrase col-lg-5">' + request.query + '</td>';
            resultTable += '<td class="addWords col-lg-3">' + request.data.boldWords + '</td>';
            resultTable += '<td class="commerce col-lg-1"><input type="checkbox">' +  '</td>';
            resultTable += '<td class="internal col-lg-1">'
                + request.data.mainPageCount + '/' + request.data.internalPageCount
                + '</td>';
            resultTable += '<td  class="col-lg-1">'
                + '<button number="' + keysCounter + '" class="issue btn btn-default btn-xs">Нажми</button></td>';

            resultTable += '</tr>';


            issues += generateSnippetsBlock(request.data.snippets,keysCounter,request.query);


            //keysAndBoldWords[request.query] = request.boldWords.join(', ');
            keysCounter++;

            if (keysCounter >= keys.length) {

                resultTable += '</div>';
//                $('div.planTable').append(resultTable);
                $('table.planTable').append(resultTable);
                $('div.issueView').append(issues);

                $('.issue').click(function() {
                    $('div.snippetsBlock').hide();
                    $('table.planTable tr').removeClass('bg-primary');
                    $('table.planTable tr[number="' + $(this).attr("number") + '"]').addClass('bg-primary');

                    $('div.snippetsBlock[number="' + $(this).attr("number") + '"]').toggle();
                })
                return;
            }


            chrome.tabs.update(searchTabId, {
                url: 'https://yandex.ru/search/?lr=39&text=' + keys[keysCounter]
            });
//            sendResponse("bar");
        }
    );
}

function generateResultTable(data) {
    $result = $('#resultTable')
    $result.show();
    $result= $('#resultTable').find('tbody');

    for (var query in data) {
        $result.append('<tr><td>' + query + '</td>\
            <td>' + data[query] + '</td></tr>');
     }
}

function generateSnippetsBlock(snips,id, query) {
    var result = '<div number="' + id + '" class="snippetsBlock" style="display: none">';
//    result += '<span>Выдача по запросу:</span>'
    result += '<h3 class="bg-info text-center">' + query + '</h3>';
    snips.forEach(function (obj, i) {
        result += generateSnippet(obj, i);
    })
    result += '</div>';
    return result;

}

function generateSnippet(snip, i) {
    return '<div class="snippet">' +
        '<h4>' + (i+1) + '.  <a target="_blank" href="' + snip.url + '">' + snip.title + '</a></h4>'
        + '<p class="url"><a href="' + snip.url + '">' + snip.humanUrl + '</a></p>'
        + '<p class="text">' + snip.text + '</p>'
        + '</div>';
}

