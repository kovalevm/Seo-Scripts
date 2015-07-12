var routes = {
    'https*://yandex.ru/(yand)?search.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'https*://www.liveinternet.ru/stat/.*/queries.html.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'https*://www.liveinternet.ru/stat/.*/searches.html.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'https*://old.metrika.yandex.ru/stat/phrases/.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'https*://(beta\.)?metrika.yandex.ru/stat/phrases.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'https*://(beta\.)?metrika.yandex.ru/list.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'http:\/\/bunker-yug\.ru\/customer\.php\?.+reporttable.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'http:\/\/bunker-yug\.ru\/customer\.php\?.+reporttable.+page.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'http:\/\/bunker-yug\.ru\/customer\.php\?.*id.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'http:\/\/bunker-yug\.ru\/customer\.php\?.*plan.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    },
    'http://bunker-yug.ru/.*': {
        toggle: 'planirovka',
        scripts: ['yandsearch/planirovka.js'],
        css: 'yandsearch/planirovka.css'
    }
}

var seoChanger = {};

chrome.storage.local.get('seoChanger', function (result) {
    seoChanger = result['seoChanger'];
    if (!!(seoChanger)) {
        seoChanger = JSON.parse(seoChanger);
    }
});


chrome.storage.onChanged.addListener(function (changes, areaName) {
    console.log(changes);
    if (changes['seoChanger']) seoChanger = changes['seoChanger'].newValue;
    seoChanger = JSON.parse(seoChanger);
});


chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    console.log('backgroung.js start on ' + tab.url);
    var pattern = '';
    if ((pattern = determinePattern(tab.url)) === null) return;
    var patternData = routes[pattern];
    console.log(patternData);
    //console.log('backgroung.js on ' + tab.url + ' with pattern - ' + pattern);
    console.log(seoChanger[patternData.toggle]);
    if (!seoChanger[patternData.toggle]) return;

    console.log('backgroung.js on ' + tab.url + ' with pattern - ' + pattern + ' with toggle - ' + patternData.toggle);
    if (patternData.css) {
        console.log(patternData.css);
        chrome.tabs.insertCSS(tab.id, {
            file: patternData.css
        });
    }

    for (var script in patternData.scripts) {
        console.log(patternData.scripts[script]);
        chrome.tabs.executeScript(tab.id, {
            file: 'myscripts/' + patternData.scripts[script]
        });
    }

});


function determinePattern(url) {
    for (var pattern in routes) {
        if (url.search(new RegExp(pattern)) == 0)
            return pattern;
    }
    return null;
}


/*var YaMetList = new RegExp('https*://(beta\.)?metrika.yandex.ru/list.*', 'i');
var GLOBAL_VALUES = {};

chrome.storage.onChanged.addListener(function(changes, areaName){
    console.log(changes);
    console.log(areaName);

});
chrome.storage.local.get('seoChanger', function (result) {
    GLOBAL_VALUES = result['seoChanger'];
    if (!!(GLOBAL_VALUES)) {
        GLOBAL_VALUES = JSON.parse(GLOBAL_VALUES);
    }
    console.log(GLOBAL_VALUES);
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (tab.url.match(YaMetList).index == 0 && GLOBAL_VALUES['metrikaList'])
        chrome.tabs.insertCSS(tab.id, {
            file: "css/yaMetrikaList.css"
        });
});*/
