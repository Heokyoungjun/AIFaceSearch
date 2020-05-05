$(document).ready(function(){
	
	$('.sub-menu').hide();
	
	$('#principale li').mouseover(function(){
		$('.sub-menu', this).stop().slideDown(1000, 'easeOutElastic');
		$(this).addClass('activate');
	});
	
	$('#principale li').mouseleave(function(){
		$('.sub-menu', this).slideUp(1000, 'easeInElastic');
		$(this).removeClass('activate');
	});
	
});