$('document').ready(function() {
	
	console.log('ready');

	// user leaves community
	$('.leaveCommunityBtn').on('click', function(e) {
		e.preventDefault();

		var communityURL = $(this).attr('href');
		console.log(communityURL);

		$.ajax({
			method: 'DELETE',
			url: communityURL,
		}).done(function(data) {
			window.location = '/account';
		})
	});

	// gameDescription view's screenshot Carousel
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
