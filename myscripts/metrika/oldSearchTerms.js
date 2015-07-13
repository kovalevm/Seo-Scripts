$(document).ready(function () {

    if (!$("button").is("#mkbtn")) {
        $('.b-placeholder').eq(0).append('<div><button id="mkbtn">Распечать фразы</button></div>');
    }
		$( "#mkbtn" ).click(function() {
			if ($("div").is("#mk")) {
				$("div#mk").remove();
			}
			printYaMetSearchTerms();
		});


});
function printYaMetSearchTerms() {
	var id = document.getElementsByClassName("align-left");
	var table = '<div id="mk"><h5> Всего фраз: ' + (id.length-3) + '</h5><table id="" style="border:1px solid black; border-collapse: collapse; margin:20px 3px"><tr><td class="serchTerms">';

	var printToAlert = "";
	for (var i = 2; i<parseInt((id.length-2)/2) + 1; i++)
	{
		printToAlert += id[i].innerText + "\n";
		table += id[i].innerText + "<br />";
	}
	console.log("Count search terms: " + (id.length-3));
	console.log("First half search terms:");
	console.log(printToAlert);printToAlert = "";
	table += '</td><td class="serchTerms">';
	for (j = parseInt((id.length-2)/2) + 1; j<id.length -1; j++)
	{
		printToAlert += id[j].innerText + "\n";
		table += id[j].innerText + "<br />";
	}
	console.log("");
	console.log("");
	console.log("Second half search terms:");
	console.log(printToAlert);
	console.log("Count search terms: " + (id.length-3));
	table += '</td></tr></table></div>';
	$('.b-placeholder').eq(0).append(table);
}
