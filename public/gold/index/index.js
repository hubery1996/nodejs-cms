// var swiper = new Swiper('.swiper-container', {
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},
// 	loop: true,
// });
var swiper2 = new Swiper('.pc-container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	loop: true,
});


new WOW().init();
// 手机端
var swiperphone = new Swiper('.phone-container', {
	pagination: {
		el: '.swiper-pagination',
	},
	loop: true,
});
var swiperphone2 = new Swiper('.phone-container-2', {
	pagination: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	loop: true,
});
var swiperphone3 = new Swiper('.phone-container-3', {
	scrollbar: {
		el: '.swiper-scrollbar',
		hide: true,
	},
});

var $top = $(".phone .title img").offset().top;
$(window).scroll(function() {
	var $height = $(this).scrollTop();
	if ($height > $top) {
		$(".phone .title").addClass("bar");
	}else{
		$(".phone .title").removeClass("bar");
	}
});
