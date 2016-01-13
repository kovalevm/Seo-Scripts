var seoChanger = {};
var routes = {}
chrome.storage.local.get('seoChanger.switches', function (result) {
    seoChanger = result['seoChanger.switches'];
    if (!!(seoChanger)) {
        seoChanger = JSON.parse(seoChanger);
    }
    routes = determineRoutes(routes);
});


chrome.storage.onChanged.addListener(function (changes, areaName) {
    //console.log(changes);
    if (changes['seoChanger.switches']) seoChanger = changes['seoChanger.switches'].newValue;
    seoChanger = JSON.parse(seoChanger);
    routes = determineRoutes(routes);
});


chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    //if (tab.status === 'loading') return;
    var patterns = [];
    if ((patterns = determinePattern(tab.url)).length === 0) return;
    console.log('backgroung.js START on ' + tab.url);
    console.log('Мы попали под паттерны - ' + patterns);
    for (var i = 0; i < patterns.length; i++) {

        var patternData = routes[patterns[i]];
        //console.log(patternData);
        //console.log('backgroung.js on ' + tab.url + ' with pattern - ' + pattern);
        //console.log(seoChanger[patternData.toggle]);
        if (!seoChanger[patternData.toggle]) continue;

        if (seoChanger[patternData.documantReady]) continue;

        //console.log('pattern - ' + patterns[i] + ' with toggle - ' + patternData.toggle);
        if (patternData.css) {
            //console.log(patternData.css);
            chrome.tabs.insertCSS(tab.id, {
                file: 'myscripts/' + patternData.css
            });
        }

        if (patternData.code) {
            //console.log(patternData.code);
            chrome.tabs.executeScript(tab.id, {
                code: patternData.code
            });
            //console.log(patternData.code + '   connect');
        }

        if (patternData.jquery != false) {
            //console.log('jquery execute!');
            chrome.tabs.executeScript(tab.id, {
                file: 'notmyscripts/jquery.js'
            });
            //console.log('Jquery connect');
        }



        if (patternData.notMyScripts && patternData.notMyScripts.length > 0) {
            //console.log(patternData.notMyScripts);
            for (var script in patternData.notMyScripts) {
                //console.log(patternData.notMyScripts[script]);
                chrome.tabs.executeScript(tab.id, {
                    file: 'notmyscripts/' + patternData.notMyScripts[script]
                });
            }
        }
        for (var script in patternData.myScripts) {
            //console.log(patternData.myScripts[script]);
            chrome.tabs.executeScript(tab.id, {
                file: 'myscripts/' + patternData.myScripts[script],
                //runAt: "document_end"
            });
        }
    }
    console.log('backgroung.js END on ' + tab.url);
    //console.log(' ');
});


function determinePattern(url) {
    var result = [];
    for (var pattern in routes) {
        if (url.search(new RegExp(pattern)) === 0)
            result.push(pattern);
    }
    return result;
}

function determineRoutes(routes) {

    return routes = {
        'https*://yandex.ru/(yand)?search.*': {
            toggle: 'planirovka',
            myScripts: ['yandsearch/newPlanirovka.js'],
            notMyScripts: ['punycode.js'],
            css: 'yandsearch/planirovka.css'
        },
//        'https*://yandex.ru/(yand)?search.*': {
//            toggle: 'planirovka',
//            myScripts: ['yandsearch/planirovka.js'],
//            notMyScripts: ['punycode.js'],
//            css: 'yandsearch/planirovka.css'
//        },
        'https*://www.liveinternet.ru/stat/.*/queries.html.*': {
            toggle: 'LIphrases',
            myScripts: ['liveinternet/queries.js'],
            css: 'liveinternet/liveinternet.css'
        },
        'https*://www.liveinternet.ru/stat/.*/searches.html.*': {
            toggle: 'LISearchSistem',
            myScripts: ['liveinternet/search_sistems.js'],
            css: 'liveinternet/liveinternet.css'
        },
        'https*://old.metrika.yandex.ru/stat/phrases/.*': {
            toggle: 'YaMphrases',
            myScripts: ['metrika/oldSearchTerms.js'],
            //css: 'yandsearch/planirovka.css'
        },
        'https*://(beta\.)?metrika.yandex.ru/stat/phrases.*': {
            toggle: 'YaMphrases',
            myScripts: ['metrika/searchTerms.js'],
            css: 'metrika/searchTerms.css'
        },
        'https*://(beta\.)?metrika.yandex.ru/stat/search_engines.*': {
            toggle: 'YaMphrases',
            myScripts: ['metrika/searchSistems.js'],
            css: 'metrika/searchTerms.css'
        },
        'https*://(beta\.)?metrika.yandex.ru/list.*': {
            toggle: 'metrikaList',
            myScripts: [],
            jquery: false,
            css: 'metrika/countersList.css'
        },
        /*   'http:\/\/bunker-yug\.ru\/customer\.php\?.+reporttable.*': {
               toggle: 'topPagination',
               myScripts: ['yandsearch/planirovka.js'],
               css: 'yandsearch/planirovka.css'
           },*/
        'http:\/\/bunker-yug\.ru\/customer\.php\?.+reporttable.+page.*': {
            toggle: 'topPagination',
            myScripts: ['bunker/topPagination.js'],
            //css: 'yandsearch/planirovka.css'
        },
        /*
        'http:\/\/bunker-yug\.ru\/customer\.php\?.*id.*': {
            toggle: 'squeeze',
            myScripts: ['bunker/squeeze.js'],
            //css: 'yandsearch/planirovka.css'
        },

        'http*s*://bunker-yug.ru/.*': {
            toggle: 'squeeze',
            myScripts: [ ],
            css: 'bunker/squeeze.css'
        },
        'http:\/\/bunker-yug\.ru\/client\.php\?.*id.*': {
            toggle: 'squeeze',
            myScripts: [ ],
            css: 'bunker/squeezeClient.css'
        },*/
        'https*://bunker-yug.ru/.*': {
            toggle: 'dopLinks',
            code: 'var bunLogin = "' + seoChanger.bunLogin + '";',
            myScripts: ['bunker/dopLinks.js'],
            css: 'bunker/dopLinks.css'
        },
        'https*://webmaster\.yandex\.ru\/addurl\.xml\?.*url.*' : { // https*://webmaster\.yandex\.ru\/addurl.
            toggle: 'addurlAutofocus',
            documantReady: true,
            code: 'document.forms[0].rep.focus();',
            //myScripts: ['addurlAutofocus.js'],
            jquery: false,
        },
        'https*://vk.com/share.php?.*url=.*' : { // https*://webmaster\.yandex\.ru\/addurl.
            toggle: 'addurlAutofocus',
            documantReady: true,
            code: 'setTimeout(function() { document.getElementById("post_button").click(); }, 4000);',
            //myScripts: ['addurlAutofocus.js'],
            jquery: false,
        },
        //document.getElementsByClassName('button-pro')[0]
        'https*://connect.ok.ru/dk?.*st.cmd=WidgetSharePreview&st.shareUrl=.*' : {
            toggle: 'addurlAutofocus',
            documantReady: true,
            code: 'setTimeout(function() { document.getElementsByClassName("button-pro")[0].click(); }, 4000);',
            jquery: false,
        },
        //document.forms[0].share.click()
        'https*://www.facebook.com/sharer/sharer.php?.*u=.*' : {
            toggle: 'addurlAutofocus',
            documantReady: true,
            code: 'setTimeout(function() { document.forms[0].share.click();  }, 4000);',
            jquery: false,
        },
        'https*://twitter.com/intent/tweet?.*status=.*' : {
            toggle: 'addurlAutofocus',
            documantReady: true,
            code: 'setTimeout(function() { document.getElementById("update-form").submit(); }, 4000);',
            jquery: false,
        },
        '.*' : {
            toggle: 'rdsStyles',
//            documantReady: true,
            jquery: false,
//            myScripts: ['rds/rdsCounditionStyles.js'],
            css: 'rds/rdsMKstyles.css'
        },
        '1*https*://bunker-yug.ru/.*': {
            toggle: 'max-font-size',
            documantReady: true,
            myScripts: ['bunker/max-font-size.js'],
        }

    }
}
