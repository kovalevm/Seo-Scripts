function adding( ) {
	function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}
var terms = document.loandata.terms.value;
var addWords = document.loandata.addWord.value;
var termsResult = document.getElementById("termsResult");
termsResult.value = ''; 
addWords = replaceAll(', ', ',',addWords);
var spliter = ",";
var arr = terms.split("\n");
var words = addWords.split(spliter);

for (j = 0; j < words.length; j++) 
{
	for (i = 0; i<arr.length; i++)
	{
		while(arr[i][arr[i].length -1] == " ")
		{
			arr[i] = arr[i].substring(0, arr[i].length - 1);
		}
		termsResult.value += arr[i].toLowerCase() + " " + words[j].toLowerCase() + "\n";
	}
	if (j < words.length -1) termsResult.value += j + "000" + getRandomInt(1,100) + "000000000000000" + + getRandomInt(1,100) +"00000000000000000000000\n";
}
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function traslit(text) {
text = text.toLowerCase();
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
	transl[' ']='_';
	transl['\n']='\n';
	

	var result='';
	for(var i=0;i<text.length;i++) {
		if(transl[text[i]]!=undefined) { result+=transl[text[i]];}
		else { /*result+=text[i];*/ }
	}
	return result;
}

function trans() {
var text = document.getElementById('transSource').value;
while(text[text.length -1] == " ")
		{
			text = text.substring(0, text.length - 1);
		}
document.getElementById('transResult').value = traslit(text);
}


document.getElementById("goButton").addEventListener("click",adding);
document.getElementById("transBtn").addEventListener("click",trans);

for (var j = 1; j < 6; j++) {
	for (i=1; i<5; i++) {
		document.getElementsByName(('m'+i + j))[0].value = '';
		if (i==1) document.getElementsByName(('r'+ i))[0].value = '';
	}
	document.getElementsByName(('fx'+ j))[0].value = '';
};
