chrome.storage.local.get('seoChanger', function(result) {
	var GLOBAL_VALUES = result['seoChanger'];
	if (!$.isEmptyObject(GLOBAL_VALUES)) {
		GLOBAL_VALUES = JSON.parse(GLOBAL_VALUES);
	}
	$(document).ready(function(){


	var loc = location.href;
	var yandSearch = new RegExp ('https*://yandex.ru/yandsearch.*','i');
	var search = new RegExp ('https*://yandex.ru/search.*','i');
	var liSearchTerms = new RegExp ('https*://www.liveinternet.ru/stat/.*/queries.html.*','i');
	var liSearchSistems = new RegExp ('https*://www.liveinternet.ru/stat/.*/searches.html.*','i');
	var yaMetSearchTerms = new RegExp ('https*://old.metrika.yandex.ru/stat/phrases/.*','i');
	var betaYaMetSearchTerms = new RegExp ('https*://(beta\.)?metrika.yandex.ru/stat/phrases.*','i');
	var YaMetList = new RegExp ('https*://(beta\.)?metrika.yandex.ru/list.*','i');
	var bunReporttable = new RegExp ('http:\/\/bunker-yug\.ru\/customer\.php\?.+reporttable.*');
    var bunReporttablePlusPage = new RegExp ('http:\/\/bunker-yug\.ru\/customer\.php\?.+reporttable.+page.*');
	var bunID = new RegExp ('http:\/\/bunker-yug\.ru\/customer\.php\?.*id.*','i');
	var bunMain = new RegExp ('http:\/\/bunker-yug\.ru\/customer\.php\?.*plan.*','i');
	var bun = new RegExp ('http://bunker-yug.ru/.*','i');


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
	else if ((loc.search(betaYaMetSearchTerms) === 0) && (GLOBAL_VALUES['YaMphrases'] == true))
	{
		$( ".report-page__table" ).before('<div><button id="mkbtn">Распечать фразы</button></div>');

		$( "#mkbtn" ).click(function() {
			if ($("table").is("#mk")) {
				$("table#mk").remove();
			}
			printBetaYaMetSearchTerms();
		});


	}
	else if (loc.search(bunReporttable) === 0)
	{
        if (GLOBAL_VALUES['topPagination'] == true && loc.search(bunReporttablePlusPage) === 0)
        {
            var navi = $('.page_navi').clone();
		    $(".main > form > table").before(navi);
        }
        if (GLOBAL_VALUES['squeeze'] == true)
        {
            $("head").append("<style>body * { max-width:1400px}.top_bar > div > div > div { display:none}body > div:nth-child(2) { margin:auto;}#search { left: 1150px !important;}tr > td:nth-child(12), tr > td:nth-child(15),tr > td:nth-child(16),tr > td:nth-child(10),tr > td:nth-child(9) { display: none; width: 0px;}body {overflow-x: auto;}</style>");
        }

	}
	else if (loc.search(bunID) === 0 && (GLOBAL_VALUES['squeeze'] == true)) 
	{
        //$(document).ready(function(){
            iframe = $('#seoWind').find("iframe");
            var iframeDoc = iframe[0].contentWindow.document;
            table = iframeDoc.getElementsByTagName('table')[0];
            table.style.width = 'inherit';
            tds = table.getElementsByTagName('td');
            tds[1].style.display = 'none';
            tds[2].style.display = 'none';
            $("head").append("<style>body * { max-width:1400px } #seopanel { width:1080px } .seos { width: inherit; } .showCopy { /* position: absolute;*/ left: 700px; } #CopyDiv table > tbody > tr > td:nth-child(2),#CopyDiv table > tbody > tr > td:nth-child(3),#CopyDiv table > tbody > tr > td:nth-child(4),#CopyDiv table > tbody > tr > td:nth-child(9){ display:none } body > div:nth-child(2) { margin:auto; } #search { left: 1150px !important; } .tit_st.catPP { width:initial !important; } body {overflow-x: auto;}</style>");
       // });


	}
	else if (loc.search(bunMain) === 0 && (GLOBAL_VALUES['squeeze'] == true)) 
	{
		$("head").append("<style>body * { max-width:1400px}.top_bar > div > div > a:nth-child(19), .top_bar > div > div > a:nth-child(20), .top_bar > div > div > a:nth-child(21) { display:none}body > div:nth-child(2) { margin:auto;}#search { left: 1150px !important;}.tit_st.catWork { width:initial !important;}body {overflow-x: auto;}</style>");


	}



	else if (loc.search(YaMetList) === 0 && (GLOBAL_VALUES['metrikaList'] == true) )
	{
	//http://www.cssdrive.com/compressor/compress.php
	//http://mabblog.com/cssoptimizer/uncompress.html


		$("head").append("<style>td.counters-table__cell-chosen.counters-table__body-cell{ padding:0px 3px 0; vertical-align:middle}td.counters-table__cell-status.counters-table__body-cell{padding:0 3px;vertical-align:middle}td.counters-table__cell-title.counters-table__body-cell{padding:0 0px 0 30px;vertical-align:middle}td.counters-table__cell-visits.counters-table__body-cell{padding:0;vertical-align:middle}td.counters-table__cell-chart.counters-table__body-cell{padding:0}td.counters-table__cell-counter-type.counters-table__body-cell{padding:0;display:none}th.counters-table__head-cell.counters-table__head-cell_type_counter-type{padding:0;display:none}td.counters-table__cell-webcounter.counters-table__body-cell{padding:0;display:none}th.counters-table__head-cell.counters-table__head-cell_type_webcounter{padding:0;display:none}td.counters-table__cell-grants.counters-table__body-cell{padding:0}td.counters-table__cell-grants.counters-table__body-cell div.counter-grant-unsubscribe{ display:none}th.counters-table__head-cell.counters-table__head-cell_type_controls{padding:0}td.counters-table__cell-controls.counters-table__body-cell{padding:0}td.counters-table__cell-removes.counters-table__body-cell{padding:0}table.counters-table.counters-table_type_all.counters__table.i-bem.counters-table_js_inited{width:900px}.counters-table__info{ display:none}td.counters-table__cell-title.counters-table__body-cell{ width:100px}td.counters-table__cell-controls.counters-table__body-cell{ width:30px}table.counters-table.counters-table_type_all.counters__table.i-bem.counters-table_js_inited >tbody{ width:100%}table.counters-table.counters-table_type_all.counters__table.i-bem.counters-table_js_inited{ display:block;  width:100%}tr.counters-table__body-row{ display:inline-block; float:left; width:800px; border-right:1px solid black; padding:0 5px}thead >tr{ display:none}td.counters-table__cell-chart.counters-table__body-cell{ text-align:right; width:200px}.counters-table__chart-wrap{ float:right}.counter-visits{ float:right}td.counters-table__cell-title.counters-table__body-cell{ width:100%}td.counters-table__cell-grants.counters-table__body-cell{ vertical-align:middle}</style>");
	}

	if (loc.search(bun) === 0  && (GLOBAL_VALUES['dopLinks'] == true) )	{
		$(".links_adm").prepend('<a href="customer.php?type=reporttable&amp;view=my">Мои отчеты</a> | <span id="clientsPageLink" style="color: #06F;cursor: pointer;">Клиенты</span> <input type="radio" name="clientsPage" value="1">1<input checked type="radio" name="clientsPage" value="2">2<input type="radio" name="clientsPage" value="3">3<input type="radio" name="clientsPage" value="4">4 | ');

		$( "#clientsPageLink" ).click(function() {
			var radio = $('input[name=clientsPage]:checked').val();
			document.location.href='/customer.php?type=reporttable&seoman='+ GLOBAL_VALUES['bunLogin']  +'&page=' + radio;
		});

		$("head").append("<style>.tit_f .tit_f_otstup {  width: 180px;}</style>")
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

	});
});



