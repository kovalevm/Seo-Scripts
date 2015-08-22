function template(data) {
    var s = '\
<div id="mk" style="width:500px;">\
    <div class="bold-words-div">\
        <h3><em>Подсвеченные слова:</em></h3>\
        <p class="bold-words">' + data.boldWords + '</p>\
    </div>\
    <div class="issue">\
        <br><span>Каталогов:' + data.catalogPageCount + '</span>\
        <br><span>Главная/Внутренная:' + data.mainPageCount + '/' + data.internalPageCount + '</span>\
        <ol style="padding-left: 15px;">';

    $.each(data.snippets
        function (i, snippet) {
            s += '\
            <li class="';
            if (snippet.isBadPage) s += 'bad-li-ol';
            s += 'li-ol">\
                <h3>' + snippet.title + '</h3>\
                <input type="checkbox" class="checkbox-ol" checked="';
            if (!snippet.isBadPage) s += 'checked';
            s += '">'
            if (snippet.main) s += 'Гл';
            else s += 'Вн';
            '- <a class="a-ol" target="_blank" href="' + snippet.url.href + '">' + snippet.humanUrl + '</a>\
            </li>';

        });


    s += '</ol>\
        <button type="button" id="btnOpenIssueLinks" onclick="openTabs();">Открыть отмеченные страницы</button>\
    </div>\
</div>';

    return s;
}
