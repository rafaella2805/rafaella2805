/*
JavaScript for the demo: Recreating the Nikebetterworld.com Parallax Demo
Demo: Recreating the Nikebetterworld.com Parallax Demo
Author: Ian Lunn
Author URL: http://www.ianlunn.co.uk/
Demo URL: http://www.ianlunn.co.uk/demos/recreate-nikebetterworld-parallax/
Tutorial URL: http://www.ianlunn.co.uk/blog/code-tutorials/recreate-nikebetterworld-parallax/
*/


$(document).ready(function() { //when the document is ready...

	redrawDotNav();

	$('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').hide();
               $('#message-warning').hide();
               $('#contactForm').fadeIn();
               $('#contactName').val('');
               $('#contactEmail').val('');
               $('#contactMessage').val('');
               $('#message-success').fadeIn();   
            }
            // There was an error
            else {
               $('#image-loader').hide();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }

	      }

      });

      return false;

   });

	$('.logo').localScroll(800);
	$('#nav').localScroll(800);
	$(".bg").everyTime(6, function(){						 
		$(".bg").animate({bottom:"0px"}, 1000).animate({bottom:"-15px"}, 1000);
  	});
	//save selectors as variables to increase performance
	var $window = $(window);
	var $homeBG = $('#home');
	var homeanimate = $('#home .animate');
	var $about = $('#about');
	var aboutanimate = $('#about .animate');
	var $portfolio = $('#portfolio');
	var portfolioanimate = $('#portfolio .animate');
	var $contato = $('#contato');
	var contatoanimate = $('#contato .animate');
	
	var windowHeight = $window.height(); //get the height of the window
	
	
	//apply the class "inview" to a section that is in the viewport
	$("#home, #about, #portfolio, #contato").bind("inview", function (event, visible) {
			if (visible) {
			$(this).addClass("inview");
			} else {
			$(this).removeClass("inview");
			}
		});
	
			
	//function that places the navigation in the center of the window
	// function RepositionNav(){
	// 	var windowHeight = $window.height(); //get the height of the window
	// 	var navHeight = $('#nav').height() / 2;
	// 	var windowCenter = (windowHeight / 2); 
	// 	var newtop = windowCenter - navHeight;
	// 	$('#nav').css({"top": newtop}); //set the new top position of the navigation list
	// }
	
	//function that is called for every pixel the user scrolls. Determines the position of the background
	/*arguments: 
		x = horizontal position of background
		windowHeight = height of the viewport
		pos = position of the scrollbar
		adjuster = adjust the position of the background
		inertia = how fast the background moves in relation to scrolling
	*/
	function newPos(x, windowHeight, pos, adjuster, inertia){
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
	}
	
	//function to be called whenever the window is scrolled or resized
	function Move(){ 
		var pos = $window.scrollTop(); //position of the scrollbar
		
		// Ausgabe: Position, Window height
		//$("#meta").html("pos: "+pos+" windowHeight: "+windowHeight);
		
		// home: 0
		if($homeBG.hasClass("inview")){
			//call the newPos function and change the background position
			$homeBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 530, 0.3)}); 
			//call the newPos function and change the secnond background position
			homeanimate.css({'backgroundPosition': newPos(50, windowHeight, pos, 1143, 0.6)});
		}
		
		// about: 800
		if($about.hasClass("inview")){
			//call the newPos function and change the background position
			$about.css({'backgroundPosition': newPos(50, windowHeight, pos, 1530, 0.3)});
			//call the newPos function and change the secnond background position
			aboutanimate.css({'backgroundPosition': newPos(100, windowHeight, pos, 2040, 0.6)})
		}
		
		// portfolio: 1600
		if($portfolio.hasClass("inview")){
			//call the newPos function and change the background position
			$portfolio.css({'backgroundPosition': newPos(50, windowHeight, pos, 2530, 0.3)}); 
			//call the newPos function and change the secnond background position
			portfolioanimate.css({'backgroundPosition': newPos(50, windowHeight, pos, 3640, 0.6)});
		}
		
		// contato: 2400
		if($contato.hasClass("inview")){
			//call the newPos function and change the background position
			$contato.css({'backgroundPosition': newPos(50, windowHeight, pos, 3530, 0.3)}); 
			//call the newPos function and change the secnond background position
			contatoanimate.css({'backgroundPosition': newPos(105, windowHeight, pos, 3660, -0.6)});
		}
		
		//$('#pixels').html(pos); //display the number of pixels scrolled at the bottom of the page
	}
		
	//RepositionNav(); //Reposition the Navigation to center it in the window when the script loads
	
	$window.resize(function(){ //if the user resizes the window...
		Move(); //move the background images in relation to the movement of the scrollbar
		//RepositionNav(); //reposition the navigation list so it remains vertically central
	});		
	
	$window.bind('scroll', function(){ //when the user is scrolling...
		Move(); //move the background images in relation to the movement of the scrollbar
		redrawDotNav();
	});


	
});
/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#about').offset().top - (($('#portfolio').offset().top - $('#about').offset().top) / 2);
	var section3Top =  $('#portfolio').offset().top - (($('#contato').offset().top - $('#portfolio').offset().top) / 2);
	var section4Top =  $('#contato').offset().top - (($(document).height() - $('#contato').offset().top) / 2);;
	$('nav#primary a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.home').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.about').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.portfolio').addClass('active');
	} else if ($(document).scrollTop() >= section4Top){
		$('nav#primary a.contato').addClass('active');
	}
}
