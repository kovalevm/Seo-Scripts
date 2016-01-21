
    if (!$("div").is("#mkLinks") && $("body")) {
        $("body").prepend('<div id="mkLinks" class="top_red_button" style="left: 10px;">\
        <a href="customer.php?type=plan&amp;job=1">Главная</a> | <span>Кл.</span>\
        <a class="clientsPage" href="' + clientsLink(bunLogin,1) + '">1</a>\
<a class="clientsPage" href="' + clientsLink(bunLogin,2) + '">2</a>\
<a class="clientsPage" href="' + clientsLink(bunLogin,3) + '">3</a>\
<a class="clientsPage" href="' + clientsLink(bunLogin,4) + '">4</a>\</div>');

    };
