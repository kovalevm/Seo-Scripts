$(document).ready(function () {
    if ($("table").is("#mk")) {} else {
        printLiSearchSistems();

        /*выделение текста при щелчке*/
        $('table.LiSS').click(function () {

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

function printLiSearchSistems() {
    var printToAlert = "";
    var table = '<table id="mk" class="LiSS">';
    var t = document.getElementsByTagName('table')[9];
    labels = t.getElementsByTagName('label');
    fonts = t.getElementsByTagName('font');
    for (i = 0; i < labels.length - 2; i++) {
        if (fonts[i * 3].innerText === '0.0%') break;
        printToAlert += labels[i].innerText + ' | ' + fonts[i * 3].innerText + "\n";
        table += '<tr><td style="width:170px">' + labels[i].innerText + '</td><td style="text-align: right;">' + fonts[i * 3].innerText + '</td></tr>';
    }
    table += '</table>'
    $('table').eq(6).append(table);
    console.log(printToAlert);
}
