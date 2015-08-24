
function updateBadHosts() {
    $.post('http://strikerdeveloper.myjino.ru/badHosts.php', {
            action: "update"
        })
        .done(function (data) {
            chrome.storage.local.set({
                'seoChanger.badHosts': badHosts
            })
        });
}

function buildBadListTable() {
    chrome.storage.local.get('seoChanger.badHosts', function (result) {
        var badHosts = result['seoChanger.badHosts'];
        if ($.isEmptyObject(badHosts)) {
            console.log('badHosts is empty');
            badHosts = null;
        } else {
            badHosts = JSON.parse(badHosts);
            console.log(badHosts);
            var s = '';
            $.each(badHosts,
                function (i, badHost) {
                    s += '<tr>\
                        <td>' + badHost.id + '</td>\
                        <td>' + badHost.host + '</td>\
                        <td>' + badHost.label + '</td>\
                        <td>' + badHost.date + '</td>\
                    </tr>';
                });
        }
        $('#badHoststable>tbody').append( s );
    });
}

