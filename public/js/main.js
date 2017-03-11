$('document').ready(function() {
	console.log('ready');
	
	// parallax settingds
	$('.parallax1').parallax({
		imageSrc: 'http://res.cloudinary.com/dxumleria/image/upload/v1489189541/YCyU4S2_yxqzuo.jpg',
		iosFix: true,
		androidFix: true
	});

	$('.parallax2').parallax({
		imageSrc: 'http://res.cloudinary.com/dxumleria/image/upload/v1489189406/rendition1.img_ynu6la.jpg',
		iosFix: true,
		androidFix: true
	});

	$('.parallax3').parallax({
		imageSrc: 'http://res.cloudinary.com/dxumleria/image/upload/v1489189529/dmuqPS0_z7gvpt.jpg',
		iosFix: true,
		androidFix: true
	});
	$('.parallax4').parallax({
		imageSrc: 'http://res.cloudinary.com/dxumleria/image/upload/v1489189517/4mJx6rO_pj1gno.jpg',
		iosFix: true,
		androidFix: true
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











