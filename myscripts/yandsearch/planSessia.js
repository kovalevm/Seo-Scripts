

var analyzerCompetitors = {
    buttonView: function () {
        var result = '';
        chrome.storage.local.get('seoChanger', function (result) {
            sC = result['seoChanger'];
            con(sC);
            if (sC.planirovkaSession) result = '<span>Сессия планировки запущена</span><button id="stopPS">Закончить сессию</button>';
            else
                result = '<button id="startPS">Начать сессию</button>'
        });
        con(result);
        return result;
    },
};



analyzerCompetitors.initialize = function () {
    chrome.storage.local.get('seoChanger', function (result) {
        sC = result['seoChanger'];

        sC.planirovkaSession = {};

        chrome.storage.local.set({
            'seoChanger': sC
        });
    });
}


analyzerCompetitors.stopped = function () {
    chrome.storage.local.get('seoChanger', function (result) {
        sC = result['seoChanger'];

        delete sC.planirovkaSession;

        chrome.storage.local.set({
            'seoChanger': sC
        });
    });
}


function con(data) {
    console.log(data);
}
