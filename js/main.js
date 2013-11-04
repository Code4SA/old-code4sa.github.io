//Scroll To
$(".scroll").click(function(event){		
	event.preventDefault();
	$("html,body").animate({scrollTop:$(this.hash).offset().top}, 400)
});

//Scroll Spy Refresh
$('#navbar').scrollspy()

//Scroll To Top
$(document).ready(function(){
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
});
