$('document').ready(function() {
	console.log('ready');
	
	
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


	// accept user request to borrow a game
	$('.acceptLoanRequest').on('submit', function(e) {
		e.preventDefault();
		var acceptURL = $(this).attr('action');

		$.ajax({
			method: 'PUT',
			url: acceptURL
		})
		.done(function(data) {
			window.location = '/account'
		});
	});

	// deny user request to borrow a game
	$('.denyLoanRequest').on('submit', function(e) {
		e.preventDefault();
		var DenyURL = $(this).attr('action');

		$.ajax({
			method: 'PUT',
			url: DenyURL
		})
		.done(function(data) {
			window.location = '/account'
		});
	});

	// return a borrowed game
	$('.returnGame').on('submit', function(e) {
		e.preventDefault();
		var returnURL = $(this).attr('action');

		$.ajax({
			method: 'PUT',
			url: returnURL
		})
		.done(function(data) {
			window.location = '/account'
		});
	});

	// request to borrow a game
	$('.requestGame').on('submit', function(e) {
		e.preventDefault();
		var requestURL = $(this).attr('action');

		$.ajax({
			method: 'PUT',
			url: requestURL
		})
		.done(function(data) {
			window.location = '/account'
		});
	});


	//login/signup form
	$('#loginSignupModal').tabs();
	$('.loginSignupBtn').on('click', function() {
		$('#loginSignupModal').toggle('.hideIt');
	});

	//createCommunity form
	$('.createCommunityBtn').on('click', function() {
		$('#createCommunityModal').toggle('.hideIt');
	});

});











