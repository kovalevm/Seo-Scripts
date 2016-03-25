String.prototype.replaceAll = function(search, replace){
  return this.split(search).join(replace);
}

document.getElementById("go").addEventListener("click", main);
document.getElementById("downloadCsv").addEventListener("click", saveCsv);

$('table#planTable').on('click', 'td.commerce', function () {
    if ($(this).text() === 'К') $(this).text('Нк');
    else $(this).text('К');
});

$('table#planTable').on('click', 'td.addWords span.glyphicon.glyphicon-remove', function () {
    $(this).parent().remove();
});

$('#competitors-block').on('click', 'span.glyphicon.glyphicon-remove.concurent-remove', function () {
    $(this).parent().parent().remove();
});

$(document).on('mouseenter', '.snippet', function () {
    $(this).find('.text').fadeIn();
});
$(document).on('mouseleave', '.snippet', function () {
    $(this).find('.text').fadeOut(0);
});

//$('table#planTable').on('show.bs.popover', '.issue', function () {
//
//    var popoverId = $(this).attr("aria-describedby"),
//        $popover = $('#' + popoverId);
//    console.log($popover);
//    $popover.css('top', pageYOffset + 'px')
//        //                    console.log(this);
//})


var issues = [];


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

    var $progressbar = $('#progressbar');
    $progressbar.attr('aria-valuemax', keys.length);
    $progressbar.attr('aria-valuenow', keysCounter);

    var competitors = [];
    //    $progressbar.width( '0%')

    var $table = $('#planTable_dad');
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (sender.tab.id !== searchTabId) return;
            console.log(request);

            var tr = '';

            tr += '<tr class="ui-state-default" number="' + keysCounter + '">';

            //            tr += '<td class="number col-lg-1">' + (keysCounter + 1) + '</td>';
            tr += '<td class="phrase col-lg-5">' + request.query + '</td>';
            tr += '<td class="addWords col-lg-5">';
            if (request.data.boldWords.length > 0) {
                tr += '<span class="dop-word">';
                tr += request.data.boldWords.join(
                    '<span class="glyphicon glyphicon-remove"></span>, </span><span class="dop-word">'
                );
                tr += '<span class="glyphicon glyphicon-remove"></span></span>';
            }
            tr += '</td>';

            tr += '<td class="commerce">К' + '</td>';
            tr += '<td class="internal ">' + request.data.mainPageCount + '/' + request.data.internalPageCount + '</td>';
            tr += '<td >\
                <a href="#" onclick="return false;" tabindex="0"  class="issue btn btn-primary btn-xs popover-dismissible" role="button"\
                    data-container="body" data-toggle="popover"\
                    data-trigger="focus" data-placement="right" data-html="true" number="' + keysCounter + '">\
                <span class="glyphicon glyphicon-arrow-right"></span></a></td>';

            tr += '</tr>';

            $table.append(tr);
            //            issues[keysCounter] = generateSnippetsBlock(request.data.snippets, keysCounter, request.query);

            var result = '<div number="' + keysCounter + '" class="snippetsBlock" style="">';
            //    result += '<span>Выдача по запросу:</span>'
            result += '<h3 class="bg-info text-center">' + request.query + '</h3>';
            request.data.snippets.forEach(function (obj, i) {
                result += generateSnippet(obj, i);
                competitors = addCompetitor(request.query, obj, i, competitors);
            })
            result += '</div>';
            issues[keysCounter] = result;

            $progressbar.width((keysCounter / keys.length * 100) + '%');


            $('a.issue[number="' + (keysCounter) + '"]')
                .click(function (event) {
                    event.preventDefault();
                })
                .popover({
                    html: true,
                    content: function () {
                        return issues[parseInt($(this).attr("number"))];
                    }
                });

            keysCounter++;
            chrome.tabs.update(searchTabId, {
                url: 'https://yandex.ru/search/?lr=39&text=' + keys[keysCounter]
            });

            if (keysCounter >= keys.length) {
                chrome.tabs.remove(searchTabId);
                $('div.progress').hide('slow');
                console.log(competitors);
                $('#competitors-block').append(generateCompetitorsTable(competitors));

                return;
            }
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
    var result = '<div number="' + id + '" class="snippetsBlock" style="">';
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
        '<h4>' + (i + 1) + '.  <a target="_blank" href="' + snip.url + '">' + snip.title + '</a></h4>' + '<p class="url"><a target="_blank" href="' + snip.url + '">' + snip.humanUrl + '</a></p>' + '<p class="text">' + snip.text + '</p>' + '</div>';
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

function getIssue(i) {
    return issues(i);
}

function getLocation(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function addCompetitor(query, snip, i, result) {
    var a = getLocation(snip.url),
        relativePath = a.pathname + a.search + a.hash;

    if (!result[a.host]) {
        result[a.host] = {
            count : 0
        };
    }

    if (!result[a.host][relativePath]) {
        result[a.host][relativePath] = [];
    }

    result[a.host].count++;

    result[a.host][relativePath].push({
            query: query,
            pos: i + 1
        })

    return result;
}

function generateHtmlCompetitor(host, competitor) {

    var result = '\
    <div class="row concurent">\
        <div class="col-md-2 "><a target="_blank" href="http://' + host + '">' + host + '</a>  <span class="glyphicon glyphicon-remove concurent-remove"></span></div>\
        <div class="col-md-1">\
            <button type="button" class="btn btn-danger btn-xs" data-toggle="collapse" data-target="#' + host.replaceAll('.', '-') + '">Свенуть</button>\
        </div>\
        <div class="col-md-9 collapse in" id="' + host.replaceAll('.', '-') + '">\
            <table class="table table-hover table-bordered">';
    for (var resPath in competitor) {
        if (resPath === 'count') continue;

        var resPathHuman = resPath;
        if (resPath.length > 70)
            resPathHuman = resPath.substr(0, 70);
        result += '<tr>\
                        <td><a target="_blank" href="http:/' + host + resPath + '">' + resPathHuman + '</a></td><td>';

        competitor[resPath].forEach(function (obj, i) {
            result += obj.query + ' - ' + obj.pos + '<br>';
        })
        result += '</td></tr>';
    }
    result += '</table></div></div>';
    return result;
}

function generateCompetitorsTable(competitors) {
    var result = '';

//    console.log(ASort(competitors, 'count'));

    for (var host in competitors ) {
        if ( competitors[host].count < 3 ) continue;
        result += generateHtmlCompetitor(host, competitors[host]);
    }
    return result;
}

// Наша функция сравнения
function compareCount(hostA, hostB) {
    console.log(hostA);
  return hostB.count - hostA.count;
}

function ASort(aInput, name){
var aTemp = []; // временный массив
for (var sKey in aInput){aTemp.push([sKey, aInput[sKey]]);} // ключ и его значение
aTemp = aTemp.sort(function (){return arguments[0][1][name] - arguments[1][1][name]}); // сортируем временный массив
var aOutput = []; // это мы вернем
for (var nIndex = 0; nIndex < aTemp.length; nIndex++) {aOutput[aTemp[nIndex][0]] = aTemp[nIndex][1];}// собственно создаем выходной массив в нужном порядке
delete aTemp; // убираем за собой
delete aInput; // по идее исходный массив тоже нужно удалить, но далеко не всегда. можно вынести за пределы функции, но не забывать там убирать мусор
return aOutput;
}

function remove() {
    $(this).parent.remove();
}
