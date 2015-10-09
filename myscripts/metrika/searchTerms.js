$(document).ready(function () {
    if ($("div#mk")) {
        $("div#mk").remove();
    }
    printBetaYaMetSearchTerms();

    /*выделение текста при щелчке*/
    $('table#ST_mk').click(function () {

        var e = this;
        if (window.getSelection) {
            var s = window.getSelection();
            if (s.setBaseAndExtent) {
                s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);
            } else {
                var r = document.createRange();
                r.selectNodeContents(e);
                s.removeAllRanges();
                s.addRange(r);
            }
        } else if (document.getSelection) {
            var s = document.getSelection();
            var r = document.createRange();
            r.selectNodeContents(e);
            s.removeAllRanges();
            s.addRange(r);
        } else if (document.selection) {
            var r = document.body.createTextRange();
            r.moveToElementText(e);
            r.select();
        }
    });

});


function printBetaYaMetSearchTerms() {
    var phrases = Array();
    $(".data-table__dimension-item").each(function (indx, element) {
        phrases.push($(element).text());
    });

    var table = '<div id="mk"><h5> Всего фраз: ' + (phrases.length) + '</h5><table id="ST_mk" style="border:1px solid black; border-collapse: collapse; margin:20px 3px"><tr><td class="serchTerms">';
    var printToAlert = "";


    for (var i = 0; i < parseInt((phrases.length) / 2); i++) {
        table += phrases[i] + "<br />";
    }

    table += '</td><td class="serchTerms">';
    for (var j = parseInt(phrases.length / 2); j < phrases.length; j++) {
        table += phrases[j] + "<br />";
    }
    table += '</td></tr></table></div>';
    $(".report-page__table").before(table);
}
