var seoChanger = {};
var routes = {}
chrome.storage.local.get('seoChanger', function (result) {
    seoChanger = result['seoChanger'];
    if (!!(seoChanger)) {
        seoChanger = JSON.parse(seoChanger);
    }
    routes = determineRoutes(routes);
});


chrome.storage.onChanged.addListener(function (changes, areaName) {
    //console.log(changes);
    if (changes['seoChanger']) seoChanger = changes['seoChanger'].newValue;
    seoChanger = JSON.parse(seoChanger);
     routes = determineRoutes(routes);
});


chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (tab.status === 'loading') return;
    //console.log('backgroung.js start on ' + tab.url);
    var patterns = [];
    if ((patterns = determinePattern(tab.url)).length === 0) return;
    //console.log(patterns);
    for (var i = 0; i < patterns.length; i++) {
        var patternData = routes[patterns[i]];
        //console.log(patternData);
        //console.log('backgroung.js on ' + tab.url + ' with pattern - ' + pattern);
        //console.log(seoChanger[patternData.toggle]);
        if (!seoChanger[patternData.toggle]) return;

        console.log('backgroung.js on ' + tab.url + ' with pattern - ' + patterns[i] + ' with toggle - ' + patternData.toggle);
        if (patternData.css) {
            console.log(patternData.css);
            chrome.tabs.insertCSS(tab.id, {
                file: 'myscripts/' + patternData.css
            });
        }

        if (patternData.jquery != false) {
            //console.log('jquery execute!');
            chrome.tabs.executeScript(tab.id, {
                file: 'notmyscripts/jquery.js'
            });
        }

        if (patternData.code) {
            console.log(patternData.code);
            chrome.tabs.executeScript(tab.id, {
                code: patternData.code
            });
        }

        if (patternData.notMyScripts && patternData.notMyScripts.length > 0) {
            //console.log(patternData.notMyScripts);
            for (var script in patternData.notMyScripts) {
                console.log(patternData.notMyScripts[script]);
                chrome.tabs.executeScript(tab.id, {
                    file: 'notmyscripts/' + patternData.notMyScripts[script]
                });
            }
        }
        for (var script in patternData.myScripts) {
            console.log(patternData.myScripts[script]);
            chrome.tabs.executeScript(tab.id, {
                file: 'myscripts/' + patternData.myScripts[script],
                runAt : "document_end"
            });
        }
    }
});


function determinePattern(url) {
    var result = [];
    for (var pattern in routes) {
        if (url.search(new RegExp(pattern)) == 0)
            result.push(pattern);
    }
    return result;
}

function determineRoutes(routes) {

return routes = {
    'https*://yandex.ru/(yand)?search.*': {
        toggle: 'planirovka',
        myScripts: ['yandsearch/planirovka.js'],
        notMyScripts: ['punycode.js'],
        css: 'yandsearch/planirovka.css'
    },
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
        //css: 'yandsearch/planirovka.css'
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

        'http:\/\/bunker-yug\.ru\/customer\.php\?.*id.*': {
            toggle: 'squeeze',
            myScripts: ['bunker/squeeze.js'],
            //css: 'yandsearch/planirovka.css'
        },/*
        'http:\/\/bunker-yug\.ru\/customer\.php\?.*plan.*': {
            toggle: 'planirovka',
            myScripts: ['yandsearch/planirovka.js'],
            css: 'yandsearch/planirovka.css'
        },*/
    'http://bunker-yug.ru/.*': {
        toggle: 'squeeze',
        myScripts: [ /*'bunker/squeeze.js'*/ ],
        css: 'bunker/squeeze.css'
    },
    'https*://bunker-yug.ru/.*': {
        toggle: 'dopLinks',
        code : 'var bunLogin = "' + seoChanger.bunLogin + '";',
        myScripts: [ 'bunker/dopLinks.js' ],
        css: 'bunker/dopLinks.css'
    }
}
}
