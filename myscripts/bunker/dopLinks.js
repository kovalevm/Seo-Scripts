
    if (!$("mkLinks").is("#mkLinks") && $(".links_adm")) {
        $(".links_adm").prepend('<mkLinks id="mkLinks"><a href="customer.php?type=reporttable&amp;view=my">Отчеты</a> |\
        <span>Клиенты</span>\
        <a class="clientsPage" href="' + clientsLink(bunLogin,1) + '">1</a>\
<a class="clientsPage" href="' + clientsLink(bunLogin,2) + '">2</a>\
<a class="clientsPage" href="' + clientsLink(bunLogin,3) + '">3</a>\
<a class="clientsPage" href="' + clientsLink(bunLogin,4) + '">4</a>\
        | </mkLinks>');

        $("#clientsPageLink").click(function () {
            var radio = $('input[name=clientsPage]:checked').val();
            document.location.href = '/customer.php?type=reporttable&seoman=' + bunLogin + '&page=' + radio;
        });

        $("#mkLinks>input[type='radio']+label").click(function () {
            var radio = $('input[name=clientsPage]:checked').val();
            document.location.href = '/customer.php?type=reporttable&seoman=' + bunLogin + '&page=' + radio;
        });

        function clientsLink(bunLogin, page) {
            return '/customer.php?type=reporttable&seoman=' + bunLogin + '&page=' + page;
        }
    };

if ( $("title") ) {
    var loc = location.href;
    var params = location.search;
    var main = new RegExp ('http:\/\/bunker-yug\.ru\/customer\.php\?.*?type=plan.*');
    var clientsPage = new RegExp ('http:\/\/bunker-yug\.ru\/customer\.php\?.+reporttable&seoman=' + bunLogin + '(&page.*)*');


    if (loc.search(main) === 0) {
        $("title").html("Главная");
    }

    if (loc.search(clientsPage) === 0) {
        var pageNumber = parseInt(params.substr(params.length - 1));
        if (isNaN(pageNumber)) {pageNumber = 1;}

        $("title").html("Кл. " + pageNumber);
    }

}
