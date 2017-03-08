$('document').ready(function() {
	
	console.log('ready');

	$('.test').on('click', function(e) {
		e.preventDefault();
	});


	$('.responsiveCarousel').slick({
		dots: true,
		infinite: true,
		speed: 400,
		variableWidth: true,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 2500
	});


});
