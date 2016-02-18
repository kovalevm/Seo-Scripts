document.getElementById("go").addEventListener("click", main);
document.getElementById("downloadCsv").addEventListener("click", saveCsv);

$('h2.key').click(function () {
    alert('fda')
})

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

    $('div.progress').show('slow');

    //слушаем runtime.onMessage, когда приходит связка (фраза + жирные слова) -
    //добавляем её в keysAndBoldWords и обновляем странцу с поиском на следующий запрос,
    //когда запросы заканчиваются, распечатываем результат
    var keysAndBoldWords = {};
    var keysCounter = 0;
    var issues = '';

    var $progressbar = $('#progressbar');
    $progressbar.attr('aria-valuemax', keys.length);
    $progressbar.attr('aria-valuenow', keysCounter);
//    $progressbar.width( '0%')

    var $table = $('#planTable_dad');
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(request);
            var tr = '';

            tr += '<tr class="ui-state-default" number="' + keysCounter + '">';

            tr += '<td class="number col-lg-1">' + (keysCounter + 1) + '</td>';
            tr += '<td class="phrase col-lg-5">' + request.query + '</td>';
            tr += '<td class="addWords col-lg-3">' + request.data.boldWords + '</td>';
            tr += '<td class="commerce col-lg-1"><input type="checkbox">' + '</td>';
            tr += '<td class="internal col-lg-1">' + request.data.mainPageCount + '/' + request.data.internalPageCount + '</td>';
            tr += '<td  class="col-lg-1">' + '<button number="' + keysCounter + '" class="issue btn btn-default btn-xs">Нажми</button></td>';

            tr += '</tr>';

            $table.append(tr);

            issues += generateSnippetsBlock(request.data.snippets, keysCounter, request.query);
            //keysAndBoldWords[request.query] = request.boldWords.join(', ');
            keysCounter++;
            $progressbar.width( (keysCounter/keys.length * 100) + '%')


            if (keysCounter >= keys.length) {


                chrome.tabs.remove(searchTabId);
//               $('div.planTable').append(tr);
//                $('#planTable_dad').append(tr);
                    $('div.progress').hide('slow');

                $('div.issueView').append(issues);

                $(function () {
                    $("#planTable_dad").sortable();
                    $("#planTable_dad").disableSelection();
                });

                $('.issue').click(function () {
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
    $result = $('#resultTable').find('tbody');

    for (var query in data) {
        $result.append('<tr><td>' + query + '</td>\
            <td>' + data[query] + '</td></tr>');
    }
}

function generateSnippetsBlock(snips, id, query) {
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
        '<h4>' + (i + 1) + '.  <a target="_blank" href="' + snip.url + '">' + snip.title + '</a></h4>' + '<p class="url"><a href="' + snip.url + '">' + snip.humanUrl + '</a></p>' + '<p class="text">' + snip.text + '</p>' + '</div>';
}

function saveCsv() {
    var res = '';
    $('table.planTable>tbody>tr').each(function () {
        $(this).find('td').each(function () {
            res += $(this).text() + ';';
        })
        res += '\r\n';
    })

    var blob = new Blob([res], {
            type: "text/plain"
        }),
        url = window.URL.createObjectURL(blob),
        a = document.createElement("a");

    a.href = url;
    a.download = 'Планировка ' + new Date().toString().substring(4, 24) + '.csv';
    a.click();
}
