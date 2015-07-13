$(document).ready(function () {
if ($("div").is("#mk")) {
				$("div#mk").remove();
			}
printBetaYaMetSearchTerms();
});
function printBetaYaMetSearchTerms() {
	var phrases = Array();
	$(".data-table__dimension-item").each(function(indx, element){
		phrases.push($(element).text());
	});

	var table = '<div id="mk"><h5> Всего фраз: ' + (phrases.length) + '</h5><table style="border:1px solid black; border-collapse: collapse; margin:20px 3px"><tr><td class="serchTerms">';
	var printToAlert = "";


	for (var i = 0; i<parseInt((phrases.length)/2); i++)
	{
		table += phrases[i] + "<br />";
	}

	table += '</td><td class="serchTerms">';
	for (var j = parseInt(phrases.length/2); j<phrases.length; j++)
	{
		table += phrases[j] + "<br />";
	}
	table += '</td></tr></table></div>';
	$( ".report-page__table" ).before( table );
}
