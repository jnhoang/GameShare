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

	// accept user request to borrow a game
	$('.acceptLoanRequest').on('submit', function(e) {
		e.preventDefault();
		console.log($(this))
		var acceptURL = $(this).attr('name');
		var gameData = $(this).serialize();
		console.log('before the ajax call');

		$.ajax({
			method: 'PUT',
			url: acceptURL,
			data: gameData
		})
		.done(function(data) {
			console.log('in the done fx after ajax call')
			window.location = '/account'
		});
	});

});











