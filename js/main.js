  
          
//Height Define
$(document).ready(function(){
var a = $(window).height();
	$("#home").height(a - 0)
});



//Scroll To
$(".scroll").click(function(event){		
	event.preventDefault();
	$("html,body").animate({scrollTop:$(this.hash).offset().top}, 400)
});




//Scroll Spy Refresh
$('#navbar').scrollspy()




//Scroll To Top
$(document).ready(function(){
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 160) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
});



//Onload FadeIn	
$(document).ready(function(){
	$(".fadeOnLoad").hide(0).delay(1000).fadeIn(700)
});


//Div FadeOut On Scroll
$(window).scroll(function() {
    if ($(this).scrollTop() == 0) {
        $(".hero-text:hidden").fadeIn(400);
    }
    else {
        $(".hero-text:visible").fadeOut(400);
    }
});


