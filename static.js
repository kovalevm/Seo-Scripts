	/*! https://mths.be/punycode v1.3.2 by @mathias */
!function(a){function b(a){throw RangeError(E[a])}function c(a,b){for(var c=a.length,d=[];c--;)d[c]=b(a[c]);return d}function d(a,b){var d=a.split("@"),e="";d.length>1&&(e=d[0]+"@",a=d[1]),a=a.replace(D,".");var f=a.split("."),g=c(f,b).join(".");return e+g}function e(a){for(var b,c,d=[],e=0,f=a.length;f>e;)b=a.charCodeAt(e++),b>=55296&&56319>=b&&f>e?(c=a.charCodeAt(e++),56320==(64512&c)?d.push(((1023&b)<<10)+(1023&c)+65536):(d.push(b),e--)):d.push(b);return d}function f(a){return c(a,function(a){var b="";return a>65535&&(a-=65536,b+=H(a>>>10&1023|55296),a=56320|1023&a),b+=H(a)}).join("")}function g(a){return 10>a-48?a-22:26>a-65?a-65:26>a-97?a-97:t}function h(a,b){return a+22+75*(26>a)-((0!=b)<<5)}function i(a,b,c){var d=0;for(a=c?G(a/x):a>>1,a+=G(a/b);a>F*v>>1;d+=t)a=G(a/F);return G(d+(F+1)*a/(a+w))}function j(a){var c,d,e,h,j,k,l,m,n,o,p=[],q=a.length,r=0,w=z,x=y;for(d=a.lastIndexOf(A),0>d&&(d=0),e=0;d>e;++e)a.charCodeAt(e)>=128&&b("not-basic"),p.push(a.charCodeAt(e));for(h=d>0?d+1:0;q>h;){for(j=r,k=1,l=t;h>=q&&b("invalid-input"),m=g(a.charCodeAt(h++)),(m>=t||m>G((s-r)/k))&&b("overflow"),r+=m*k,n=x>=l?u:l>=x+v?v:l-x,!(n>m);l+=t)o=t-n,k>G(s/o)&&b("overflow"),k*=o;c=p.length+1,x=i(r-j,c,0==j),G(r/c)>s-w&&b("overflow"),w+=G(r/c),r%=c,p.splice(r++,0,w)}return f(p)}function k(a){var c,d,f,g,j,k,l,m,n,o,p,q,r,w,x,B=[];for(a=e(a),q=a.length,c=z,d=0,j=y,k=0;q>k;++k)p=a[k],128>p&&B.push(H(p));for(f=g=B.length,g&&B.push(A);q>f;){for(l=s,k=0;q>k;++k)p=a[k],p>=c&&l>p&&(l=p);for(r=f+1,l-c>G((s-d)/r)&&b("overflow"),d+=(l-c)*r,c=l,k=0;q>k;++k)if(p=a[k],c>p&&++d>s&&b("overflow"),p==c){for(m=d,n=t;o=j>=n?u:n>=j+v?v:n-j,!(o>m);n+=t)x=m-o,w=t-o,B.push(H(h(o+x%w,0))),m=G(x/w);B.push(H(h(m,0))),j=i(d,r,f==g),d=0,++f}++d,++c}return B.join("")}function l(a){return d(a,function(a){return B.test(a)?j(a.slice(4).toLowerCase()):a})}function m(a){return d(a,function(a){return C.test(a)?"xn--"+k(a):a})}var n="object"==typeof exports&&exports&&!exports.nodeType&&exports,o="object"==typeof module&&module&&!module.nodeType&&module,p="object"==typeof global&&global;(p.global===p||p.window===p||p.self===p)&&(a=p);var q,r,s=2147483647,t=36,u=1,v=26,w=38,x=700,y=72,z=128,A="-",B=/^xn--/,C=/[^\x20-\x7E]/,D=/[\x2E\u3002\uFF0E\uFF61]/g,E={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},F=t-u,G=Math.floor,H=String.fromCharCode;if(q={version:"1.3.2",ucs2:{decode:e,encode:f},decode:j,encode:k,toASCII:m,toUnicode:l},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return q});else if(n&&o)if(module.exports==n)o.exports=q;else for(r in q)q.hasOwnProperty(r)&&(n[r]=q[r]);else a.punycode=q}(this);

function traslit(text) {
	var transl=new Array();
	transl['а']='a';
	transl['б']='b';
	transl['в']='v';
	transl['г']='g';
	transl['д']='d';
	transl['е']='e';
	transl['ё']='yo';
	transl['ж']='zh';
	transl['з']='z';
	transl['и']='i';
	transl['й']='j';
	transl['к']='k';
	transl['л']='l';
	transl['м']='m';
	transl['н']='n';
	transl['о']='o';
	transl['п']='p';
	transl['р']='r';
	transl['с']='s';
	transl['т']='t';
	transl['у']='u';
	transl['ф']='f';
	transl['х']='h';
	transl['ц']='c';
	transl['ч']='ch';
	transl['ш']='sh';
	transl['щ']='shch';
	transl['ъ']='';
	transl['ы']='y';
	transl['ь']='';
	transl['э']='eh';
	transl['ю']='yu';
	transl['я']='ya';

	var result='';
	for(var i=0;i<text.length;i++) {
		if (transl[text[i]]!=undefined) { result+=transl[text[i]]; }
		else { result+=text[i]; }
	}
	return result;
}

function isBad(word,badWords) {
	for (j=0;j<badWords.length;j++) {
		if (word.toLowerCase()===badWords[j].toLowerCase()) {
			return true;
		}
	}
	return false;
}

function isBadWithOtbrosSym(word,badWords,otbrosSym) {
	var needLength = word.length-otbrosSym;
	for (j=0;j<badWords.length;j++) {
		if (word.toLowerCase().substring(0,needLength)===badWords[j].toLowerCase().substring(0,needLength)) {// || word===traslit(badWords[j]))
		return true;
		}
	}
	return false;
}


function myConcat(main,additional) {
	for (qqq=0; qqq < additional.length; qqq++)
		main.push(additional[qqq]);
	return main;
}

function determineIssue() {
	var tempIssue = [];
	var issue = [];
	issueClassNameLength = 24;
	blocks = document.getElementsByClassName('serp-block serp-block');
	for (i=0; i < blocks.length; i++) {
		if (blocks[i].className.length === issueClassNameLength)
		{
			tempIssue.push(document.getElementsByClassName(blocks[i].className));
		}
	}
	for (i=0; i < tempIssue.length; i++) {
		issue = myConcat(issue,tempIssue[i][0].getElementsByClassName('serp-item'));
	}
	return issue;
}

function isMain(url) {
	if (url.indexOf('/') > 0) {
		if (url.indexOf('/') === url.length - 1) {
			return true;
		}
	}
	return false;
}

function deleteRigthColumn() {
	var rightColumn = document.getElementsByClassName('serp-list')[1];
	rightColumn = rightColumn.getElementsByClassName('serp-adv');
	for (var i = 0; i < rightColumn.length; i++) {
		rightColumn[i].remove();
	};
}

function determineBoldWords (issue) {
	var t = document.getElementsByTagName('title');
	t = t[0].innerHTML.toLowerCase();
	t = t.substring(0,t.indexOf('яндекс')-3);
	var result= '';
	badWords = t.split(' ');
	badWords.push('ростов','ростове','ростова','дону','на','... ');

	//issue = determineIssue();
	for (var j=0; j < issue.length; j++) {

		var h2 = issue[j].getElementsByTagName('h2')[0];
		var b = h2.getElementsByTagName('b');
		for (i=0; i<b.length-1; i++) {
			var s=b[i].innerHTML.toLowerCase().replace('<wbr>','');
//			if (s.length >7) {
//				if ( isBadWithOtbrosSym(s,badWords, 4)) continue;
//			} else {
				if ( isBadWithOtbrosSym(s,badWords, 2)) continue;
//			}
			badWords.push(s);
			result += s + ", ";
		}

		try {
			var snippet = issue[j].getElementsByClassName('serp-item__text')[0];
			var b = snippet.getElementsByTagName('b');
			for (i=0; i<b.length-1; i++) {
				var s=b[i].innerHTML.toLowerCase().replace('<wbr>','');
	//			if (s.length >7) {
	//				if ( isBadWithOtbrosSym(s,badWords, 4)) continue;
	//			} else {
					if ( isBadWithOtbrosSym(s,badWords, 2)) continue;
	//			}
				badWords.push(s);
				result += s + ", ";
			}

		} catch(e) {
			console.log('Ошибка ' + e);
			
		}
		

	}
	return'<h3><em>Подсвеченные слова:</em></h3><p class="bold-words">' + result.substring(0,result.length-2) + '</p>';
}

function determineMainAndInternalPage(issue,badHosts) {
	p = '<ol style="padding-left: 15px;">';
	p1 = '';
	mainPageCount = 0;
	internalPageCount = 0;
	catalogPageCount = 0;
	//issue = determineIssue();
	var isBadPage = false;
	page = '';

	for (i=0; i < issue.length; i++) {
		urls = issue[i].getElementsByClassName('b-link serp-item__title-link serp-item__title-link');
		h2 = issue[i].getElementsByTagName('h2')[0];
		try {
			url = urls[0].href;

		} catch(e) {
			console.log('Ошибка ' + e);
			continue;
		}

		isBadPage = isBad(urls[0].hostname,badHosts) ? true : false;
		catalogPageCount = isBadPage ? catalogPageCount+1 : catalogPageCount;
		humanUrl = url.replace(/http[s]*:\/\/(www.)*/g, '');

		page = isMain(humanUrl) ? 'Гл' : 'Вн';
		page = isBadPage ? 'Каталог' : page;
		if (urls[0].hostname==="ru.wikipedia.org") page = 'Википедия'
			if (!isBadPage) {
				if (page==='Гл') { mainPageCount++; } else { internalPageCount++; }
			} else {

			}
			humanUrl = (humanUrl.length > 50) ? humanUrl.substring(0,50) + "..." : humanUrl;
			humanUrl = (humanUrl.lastIndexOf("/") === humanUrl.length -1) ? humanUrl.substring(0,url.length -1) : humanUrl;

			//li
			p += '<li ';
			p += isBadPage ? 'class="bad-li-ol li-ol"' : 'class="li-ol"';
			p += '>';

			p += '<h3>' + h2.innerText + '</h3>';
			//checkbox
			p += '<input type="checkbox" class="checkbox-ol"';
			p += !isBadPage ? 'checked' : '';
			p += '>'
			p += page + ' - ' + '<a class="a-ol" target="_blank" href="'+url+'">';


			if (humanUrl.indexOf('/') > -1 ) {
				p += punycode.toUnicode(humanUrl.substring(0,humanUrl.indexOf('/'))) + humanUrl.substring(humanUrl.indexOf('/'));
			}
			else {
				p += punycode.toUnicode(humanUrl);
			}



			p += '</a></li>'
		}
		p += '</ol>';
		p1 += '<br /><span>Каталогов: ' + catalogPageCount + '</span><br />';
		p1 += '<span>Главная/Внутренная: ' + mainPageCount + '/' + internalPageCount + '</span>';
//		p +=  '<br />';
		p += '<button type="button" id="btnOpenIssueLinks" onclick="openTabs();">Открыть отмеченные страницы</button>';

		p1 += p;
		return p1;
	}

function insertStript() {
	var loadedJS = document.createElement('script');
	loadedJS.text = "function openTabs() {  	var a = document.getElementsByClassName('a-ol'); 	var ck = document.getElementsByClassName('checkbox-ol'); 	for (j=0; j < ck.length; j++) { 		if (ck[j].checked===true) { 			window.open(a[j] , '_blank'); 		} 	} }";

	loadedJS.type = "text/javascript";
	loadedJS.language = "javascript";
	var head = document.getElementsByTagName('head')[0];

	head.appendChild(loadedJS);
	}

function printLiSearchTerms() {
	var id = document.getElementsByName("id");
	var printToAlert = "";
	var table = '<h5> Всего фраз: ' + (id.length-1) + '</h5><table style="border:1px solid black; border-collapse: collapse; margin:20px 3px"><tr><td class="serchTerms">';
	for (i = 0;
		i<parseInt((id.length-2)/2) + 1;
		i++){
		printToAlert += id[i].labels[0].innerText + "\n";
	table += id[i].labels[0].innerText + "<br />"
	}
	console.log("Count search terms: " + (id.length-1));
	console.log("First half search terms:");
	console.log(printToAlert);
	printToAlert = "";
	table += '</td><td class="serchTerms">';
	for (j = parseInt((id.length-2)/2) + 1; j<id.length -2; j++) {
		printToAlert += id[j].labels[0].innerText + "\n";
		table += id[j].labels[0].innerText + "<br />"
	}
	console.log("");
	console.log("");
	console.log("Second half search terms:");
	console.log(printToAlert);
	console.log("Count search terms: " + (id.length-1));
	table += '</td></tr></table>';
	$('table').eq(6).append(table);
}

function printLiSearchSistems() {
	var printToAlert = "";
	var table = '<table class="LiSS">';
	var t = document.getElementsByTagName('table')[9];
	labels = t.getElementsByTagName('label');
	fonts = t.getElementsByTagName('font');
	for (i = 0; i<labels.length - 2; i++) 
	{
		if (fonts[i*3].innerText === '0.0%') break;
		printToAlert += labels[i].innerText + ' | ' + fonts[i*3].innerText + "\n";
		table += '<tr><td style="width:170px">' + labels[i].innerText + '</td><td style="text-align: right;">' + fonts[i*3].innerText + '</td></tr>';
	}
	table += '</table>'
	$('table').eq(6).append(table);
	console.log(printToAlert);
}

function printYaMetSearchTerms() {
	var id = document.getElementsByClassName("align-left");
	var table = '<h5> Всего фраз: ' + (id.length-3) + '</h5><table id="mk" style="border:1px solid black; border-collapse: collapse; margin:20px 3px"><tr><td class="serchTerms">';

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
	table += '</td></tr></table>';
	$('.b-placeholder').eq(0).append(table);
}

function printBetaYaMetSearchTerms() {
	var phrases = Array();
	$(".data-table__dimension-item").each(function(indx, element){
		phrases.push($(element).text());
	});

	var table = '<h5> Всего фраз: ' + (phrases.length) + '</h5><table id="mk" style="border:1px solid black; border-collapse: collapse; margin:20px 3px"><tr><td class="serchTerms">';
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
	table += '</td></tr></table>';
	$( ".report-page__table" ).before( table );
}


function planirovka(badHosts) {
	var issue = determineIssue();
	deleteRigthColumn();
	$('.serp-list').eq(1).append('<div id="mk" style="width:500px;">'
		+ '<div class="bold-words-div">' + determineBoldWords (issue) + '</div>'
		+ '<div class="issue">' + determineMainAndInternalPage(issue,badHosts) + '</div>'
		+ '</div>');
}
