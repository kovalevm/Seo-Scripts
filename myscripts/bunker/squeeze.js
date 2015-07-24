$(document).ready(function () {
    iframe = $('#seoWind').find("iframe");
    var iframeDoc = iframe[0].contentWindow.document;
    table = iframeDoc.getElementsByTagName('table')[0];
    table.style.width = 'inherit';
    tds = table.getElementsByTagName('td');
    tds[1].style.display = 'none';
    tds[2].style.display = 'none';
});
