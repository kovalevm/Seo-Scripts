var badHosts = ["yabs.yandex.ru", "news.yandex.ru", "rostov.propartner.ru", "market.yandex.ru", "rostov.pulscen.ru", "rostov.tiu.ru", "rostov.blizko.ru", "rostov-na-donu.unibo.ru", "rostov-na-donu.dmir.ru", "rostovnadonu.flagma.ru", "rostov-na-donu.aport.ru", "www.rostov-na-donu.build2last.ru", "ru.wikipedia.org", "rostov.neobroker.ru", "www.rosrealt.ru", "rostovnadonu.irr.ru", "rostov.n1.ru", "rostov-na-donu.naydidom.com", "dom.mirkvartir.ru", "www.realtymag.ru", "www.grinas.ru", "zemlidona.ru", "www.avito.ru", "allorostov.ru", "www.yell.ru", "dic.academic.ru", "rostov.printura.ru", "rostov.4geo.ru", "rnd.spravker.ru"];




if ($("div").is("#mk")) {} else {
    insertStript();
    planirovka(badHosts);
}


function planirovka(badHosts) {
    //console.log(analyzerCompetitors);
    var searchResults = $('div.serp-item[aria-posinset]');

    //analyzerCompetitors.save(searchResults);

    deleteRigthColumn();
    var data = determineData(searchResults);


    //$('.serp-list[role="complementary"]').append( template(data) );

    $('.content__right').prepend( template(data) );

    con(data);

    var query = $('input[type="search"]').val();
    chrome.runtime.sendMessage(
        {
            data: data,
            query: query
        },
        function (response) {
            console.log(response);
        }
    );

//    console.log('autoPlanTabId = ' + autoPlanTabId);
//    chrome.runtime.sendMessage({greeting: 'hello'});
    //chrome.extension.sendRequest(autoPlanTabId, {msg:"msg01"});

    //    con('badWords - ' + badWords);

}


function determineData(searchResults) {

    var data = {
        boldWords: [],
        badWords: [],
        mainPageCount: 0,
        internalPageCount: 0,
        catalogPageCount: 0,
        snippets: [],
    };

    data.badWords = $('input[type="search"][aria-label="Запрос"]').val().split(' ');
    data.badWords.push($('.region-change__link').html());
    data.badWords.push('ростов', 'ростове', 'ростова', 'дону', 'на', '... ');

    $(searchResults).each(function () {

        var title = $(this).find('h2');
        var url = $(this).find('.serp-item__title-link').attr('href');
        var snippet = $(this).find('.serp-item__text');

        //Ищем подсвеченные слова
        data = determineBoldWordsInElements([title, snippet], data);
        data = determineMainAndInternalPage(title, url, data, snippet);

    });

    return data;
}




function determineBoldWordsInElements(elements, data) {
    $(elements).each(function () {
        $(this).find('b').each(function () {

            var word = $(this).html().toLowerCase().replace('<wbr>', '');
            if (isBadWithOtbrosSym(word, data.badWords, 2)) return true;
            data.badWords.push(word);
            data.boldWords.push(word);

        })
    })
    return data;
}



function determineMainAndInternalPage(title, url, data, snippet_text) {

    var snippet = {};
    snippet.title = $(title).text();
    snippet.url = getLocation(url);
    snippet.humanUrl = punycode.toUnicode(snippet.url.hostname);
    snippet.humanUrl += snippet.url.pathname + snippet.url.search + snippet.url.hash;
    snippet.humanUrl = (snippet.humanUrl.length > 50) ? snippet.humanUrl.substring(0, 50) + "..." : snippet.humanUrl;

    snippet.isBadPage = isBad(snippet.url.hostname, badHosts) ? true : false;

    data.catalogPageCount = snippet.isBadPage ? data.catalogPageCount + 1 : data.catalogPageCount;

    snippet.main = isMain(snippet.humanUrl) ? true : false;

    if (!snippet.isBadPage) {
        if (snippet.main) data.mainPageCount++;
        else data.internalPageCount++;
    }

    snippet.text = $(snippet_text).html();
    snippet.url = url;
    data.snippets.push(snippet);
    return data;
}



function deleteRigthColumn() {
    try {
        $('.serp-list[role="complementary"]').empty();
    } catch (e) {
        con('Ошибка при очистке правого сектора - ' + e);
    }
}

function isMain(url) {
    if (url.indexOf('/') > 0) {
        if (url.indexOf('/') === url.length - 1) {
            return true;
        }
    }
    return false;
}

function insertStript() {
    var loadedJS = document.createElement('script');
    loadedJS.text = "\
    function openTabs() {\
        var a = document.getElementsByClassName('a-ol');\
        var ck = document.getElementsByClassName('checkbox-ol');\
        for (j=0; j < ck.length; j++) {\
            if (ck[j].checked===true) {\
                window.open(a[j] , '_blank');\
            }\
        }\
    }";

    loadedJS.type = "text/javascript";
    loadedJS.language = "javascript";
    var head = document.getElementsByTagName('head')[0];

    head.appendChild(loadedJS);
}



function isBadWithOtbrosSym(word, badWords, otbrosSym) {
    var needLength = word.length - otbrosSym;
    for (j = 0; j < badWords.length; j++) {
        if (word.toLowerCase().substring(0, needLength) === badWords[j].toLowerCase().substring(0, needLength)) {

            return true;
        }
    }
    return false;
}

function isBad(word, badWords) {
    for (j = 0; j < badWords.length; j++) {
        if (word.toLowerCase() === badWords[j].toLowerCase()) {
            return true;
        }
    }
    return false;
}

function getLocation (href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function template(data) {
    var s = '\
<div id="mk" style="width:500px;">\
    <div class="bold-words-div">\
        <h3><em>Подсвеченные слова:</em></h3>\
        <p id="bold-words" class="bold-words">' + data.boldWords + '</p>\
    </div>\
    <div class="issue">\
        <br><span>Каталогов:' + data.catalogPageCount + '</span>\
        <br><span>Главная/Внутренная:' + data.mainPageCount + '/' + data.internalPageCount + '</span>\
        <ol style="padding-left: 15px;">';

    $.each(data.snippets,
        function (i, snippet) {
            s += '\
            <li class="';
            if (snippet.isBadPage) s += 'bad-li-ol ';
            s += 'li-ol">\
                <h3>' + snippet.title + '</h3>\
                <input type="checkbox" class="checkbox-ol"';
            if (!snippet.isBadPage) s += 'checked';
            s += '>'
            if (snippet.main) s += 'Гл';
            else s += 'Вн';
            s += '- <a class="a-ol" target="_blank" href="' + snippet.url.href + '">' + snippet.humanUrl + '</a>\
            </li>';

        });


    s += '</ol>\
        <button type="button" id="btnOpenIssueLinks" onclick="openTabs();">Открыть отмеченные страницы</button>\
    </div>\
</div>';

    return s;
}

function con(data) {
    console.log(data);
}
/*
console.log(chrome.extension);

console.log(chrome.tabs);

*/
