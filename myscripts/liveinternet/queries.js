$(document).ready(function () {
    if ($("table").is("#mk")) {} else {

        printLiSearchTerms();

        /*выделение текста при щелчке*/
        $('td.serchTerms').click(function () {

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
    }

});

function printLiSearchTerms() {
    var id = document.getElementsByName("id");
    var printToAlert = "";
    var table = '<h5> Всего фраз: ' + (id.length - 1) + '</h5><table id="mk" style="border:1px solid black; border-collapse: collapse; margin:20px 3px"><tr><td class="serchTerms">';
    for (i = 0; i < parseInt((id.length - 2) / 2) + 1; i++) {
        printToAlert += id[i].labels[0].innerText + "\n";
        table += id[i].labels[0].innerText + "<br />"
    }
    console.log("Count search terms: " + (id.length - 1));
    console.log("First half search terms:");
    console.log(printToAlert);
    printToAlert = "";
    table += '</td><td class="serchTerms">';
    for (j = parseInt((id.length - 2) / 2) + 1; j < id.length - 2; j++) {
        printToAlert += id[j].labels[0].innerText + "\n";
        table += id[j].labels[0].innerText + "<br />"
    }
    console.log("");
    console.log("");
    console.log("Second half search terms:");
    console.log(printToAlert);
    console.log("Count search terms: " + (id.length - 1));
    table += '</td></tr></table>';
    $('table').eq(6).append(table);
}
