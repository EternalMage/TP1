$(document).ready(function(){
    $('.retirer').click(function(){
	var row = $(this).closest('tr');
	var id = row.find('.item').first().attr('id');
	$.ajax('http://localhost:3000/api/attraction/' + id,
	       {type:'DELETE',
		success: function(){ row.remove(); } });
    });



});

