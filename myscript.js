chrome.storage.local.get('seoChanger', function(result) {
	var GLOBAL_VALUES = result['seoChanger'];
	if (!$.isEmptyObject(GLOBAL_VALUES)) {
		GLOBAL_VALUES = JSON.parse(GLOBAL_VALUES);
	}
//	$(document).ready(function(){


	var loc = location.href;
	var yandSearch = new RegExp ('https*://yandex.ru/yandsearch.*','i');
	var search = new RegExp ('https*://yandex.ru/search.*','i');
	var liSearchTerms = new RegExp ('https*://www.liveinternet.ru/stat/.*/queries.html.*','i');
	var liSearchSistems = new RegExp ('https*://www.liveinternet.ru/stat/.*/searches.html.*','i');
	var yaMetSearchTerms = new RegExp ('https*://metrika.yandex.ru/stat/phrases/.*','i');
	var bunReporttable = new RegExp ('http://bunker-yug.ru/customer.php?type=reporttable.*','i');
	var bunID = new RegExp ('http://bunker-yug.ru/customer.php?p=edit&id=.*','i');
	var bunMain = new RegExp ('http://bunker-yug.ru/customer.php?type=plan.*','i');


	if (((loc.search(yandSearch) === 0) || (loc.search(search) === 0)) && (GLOBAL_VALUES['planirovka'] == true)) {

		var badHosts = ["yabs.yandex.ru","news.yandex.ru","rostov.propartner.ru","market.yandex.ru","rostov.pulscen.ru","rostov.tiu.ru","rostov.blizko.ru","rostov-na-donu.unibo.ru","rostov-na-donu.dmir.ru","rostovnadonu.flagma.ru","rostov-na-donu.aport.ru","www.rostov-na-donu.build2last.ru","ru.wikipedia.org","rostov.neobroker.ru","www.rosrealt.ru","rostovnadonu.irr.ru","rostov.n1.ru","rostov-na-donu.naydidom.com","dom.mirkvartir.ru","www.realtymag.ru","www.grinas.ru","zemlidona.ru","www.avito.ru","allorostov.ru","www.yell.ru","dic.academic.ru","rostov.printura.ru", "rostov.4geo.ru", "rnd.spravker.ru"];
		insertStript();
		setInterval(function(){
			if ($("div").is("#mk")) {}
				else
				{

					planirovka(badHosts);
				}
			},2000);
		
	} 
	else if ((loc.search(liSearchTerms) === 0) && (GLOBAL_VALUES['LIphrases'] == true)) 
	{
		printLiSearchTerms();			
	} 

	else if ((loc.search(liSearchSistems) === 0) && (GLOBAL_VALUES['LISearchSistem'] == true))
	{
		printLiSearchSistems();	
	} 
	else if ((loc.search(yaMetSearchTerms) === 0) && (GLOBAL_VALUES['YaMphrases'] == true))
	{
		setInterval(function(){
			if ($("table").is("#mk")) {

			}
			else
			{
				printYaMetSearchTerms();
			}
		},2000);
	}
	else if ((loc.search(bunReporttable) === 0) && (GLOBAL_VALUES['topPagination'] == true)) 
	{
		var navi = $('.page_navi');
		$(".main > form > table").before(navi);
	}
	else if (loc.search(bunReporttable) === 0 && (GLOBAL_VALUES['squeeze'] == true)) {
		$("head").append("<style>body * { max-width:1400px}.top_bar > div > div > div { display:none}body > div:nth-child(2) { margin:auto;}#search { left: 1150px !important;}tr > td:nth-child(12), tr > td:nth-child(15),tr > td:nth-child(16),tr > td:nth-child(10),tr > td:nth-child(9) { display: none; width: 0px;}body {overflow-x: auto;}</style>");
	}
	else if (loc.search(bunID) === 0 && (GLOBAL_VALUES['squeeze'] == true)) 
	{
		$("head").append("<style>body * { max-width:1400px } #seopanel { width:1080px } .seos { width: inherit; } .showCopy { /* position: absolute;*/ left: 700px; } #CopyDiv table > tbody > tr > td:nth-child(2),#CopyDiv table > tbody > tr > td:nth-child(3),#CopyDiv table > tbody > tr > td:nth-child(4),#CopyDiv table > tbody > tr > td:nth-child(9){ display:none } body > div:nth-child(2) { margin:auto; } #search { left: 1150px !important; } .tit_st.catPP { width:initial !important; } body {overflow-x: auto;}</style>");
		
		iframe = $('#seoWind').find("iframe");
		var iframeDoc = iframe[0].contentWindow.document;
		table = iframeDoc.getElementsByTagName('table')[0];
		table.style.width = 'inherit';
		tds = table.getElementsByTagName('td');
		tds[1].style.display = 'none';
		tds[2].style.display = 'none';
	}
	else if (loc.search(bunMain) === 0 && (GLOBAL_VALUES['squeeze'] == true)) 
	{
		$("head").append("<style>body * { max-width:1400px}.top_bar > div > div > a:nth-child(19), .top_bar > div > div > a:nth-child(20), .top_bar > div > div > a:nth-child(21) { display:none}body > div:nth-child(2) { margin:auto;}#search { left: 1150px !important;}.tit_st.catWork { width:initial !important;}body {overflow-x: auto;}</style>");
	}
	/*выделение текста при щелчке*/
	$('td.serchTerms').click(function() {

		var e=this; 
		if(window.getSelection){ 
			var s=window.getSelection(); 
			if(s.setBaseAndExtent){ 
				s.setBaseAndExtent(e,0,e,e.innerText.length-1); 
			}else{ 
				var r=document.createRange(); 
				r.selectNodeContents(e); 
				s.removeAllRanges(); 
				s.addRange(r);} 
			}else if(document.getSelection){ 
				var s=document.getSelection(); 
				var r=document.createRange(); 
				r.selectNodeContents(e); 
				s.removeAllRanges(); 
				s.addRange(r); 
			}else if(document.selection){ 
				var r=document.body.createTextRange(); 
				r.moveToElementText(e); 
				r.select();}
			});

//	});
});



