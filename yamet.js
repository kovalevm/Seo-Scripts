function deletemass(mass) {
	for (var i = 0; i < mass.length; i++) {
		mass[i].remove();
	};
}

$(document).ready(function(){
	$(document).ajaxStop(function() {
	var metki = document.getElementsByClassName('counters-table__cell-counter-type counters-table__body-cell');
	deletemass(metki);
/*	var metki = document.getElementsByClassName('counters-table__cell-counter-type counters-table__body-cell');
	deletemass(metki);*/
	
});
	});