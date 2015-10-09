//$(document).ready(function () {
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
//});



/*
        $(".links_adm").prepend('<mkLinks id="mkLinks"><a href="customer.php?type=reporttable&amp;view=my">Отчеты</a> |\
        <spin id="clientsPageLink" style="color: #06F;cursor: pointer;">Клиенты</spin>\
        <input type="radio" name="clientsPage" value="1" id="labeled_1"><label for="labeled_1">1</label><input checked type="radio" name="clientsPage" value="2" id="labeled_2"><label for="labeled_2">2</label><input type="radio" name="clientsPage" value="3" id="labeled_3"><label for="labeled_3">3</label><input type="radio" name="clientsPage" value="4"id="labeled_4"><label for="labeled_4">4</label>\
        | </mkLinks>');
        */
