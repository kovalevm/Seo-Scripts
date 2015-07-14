$(document).ready(function() {

$(".links_adm").prepend('<a href="customer.php?type=reporttable&amp;view=my">Отчеты</a> | <spin id="clientsPageLink" style="color: #06F;cursor: pointer;">Клиенты</spin> <input type="radio" name="clientsPage" value="1" id="labeled_1"><label for="labeled_1">1</label><input checked type="radio" name="clientsPage" value="2" id="labeled_2"><label for="labeled_2">2</label><input type="radio" name="clientsPage" value="3" id="labeled_3"><label for="labeled_3">3</label><input type="radio" name="clientsPage" value="4"id="labeled_4"><label for="labeled_4">4</label> | ');

$("#clientsPageLink").click(function () {
    var radio = $('input[name=clientsPage]:checked').val();
    document.location.href = '/customer.php?type=reporttable&seoman=' + bunLogin + '&page=' + radio;
});
    });
