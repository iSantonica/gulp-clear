(function($) {
"use strict";

// // Internet Explorer 10 in Windows Phone 8 viewport bug
// if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
// 		var msViewportStyle = document.createElement('style');
// 		msViewportStyle.appendChild(
// 				document.createTextNode(
// 						'@-ms-viewport{width:auto!important}'
// 				)
// 		);
// 		document.head.appendChild(msViewportStyle);
// }
//
// // Check if element is in viewport
// $.fn.isInViewport = function() {
// 		var elementTop    = $(this).offset().top;
// 		var elementBottom = elementTop + $(this).outerHeight();
//
// 		var viewportTop    = $(window).scrollTop();
// 		var viewportBottom = viewportTop + $(window).height();
//
// 		return elementBottom > viewportTop && elementTop < viewportBottom;
// };
//
// // Set max-height on the elements in a row
// function equalHeight(container) {
//
// 		var currentTallest = 0,
// 				currentRowStart = 0,
// 				rowDivs = [],
// 				$el,
// 				topPosition = 0;
//
// 		$(container).each(function(i) {
//
// 				$el = $(this);
// 				$el.height('auto');
// 				topPosition = $el.offset().top;
//
// 				if (currentRowStart != topPosition) {
// 						for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
// 								rowDivs[currentDiv].height(currentTallest);
// 						}
// 						rowDivs.length = 0; // empty the array
// 						currentRowStart = topPosition;
// 						currentTallest = $el.height();
// 						rowDivs.push($el);
// 				} else {
// 						rowDivs.push($el);
// 						currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
// 				}
// 				for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
// 						rowDivs[currentDiv].height(currentTallest);
// 				}
// 		});
// }
//
// // From https://davidwalsh.name/javascript-debounce-function.
// function debounce(func, wait, immediate) {
// var timeout;
// return function() {
// 	var context = this, args = arguments;
// 	var later = function() {
// 		timeout = null;
// 		if (!immediate) func.apply(context, args);
// 	};
// 	var callNow = immediate && !timeout;
// 	clearTimeout(timeout);
// 	timeout = setTimeout(later, wait);
// 	if (callNow) func.apply(context, args);
// };
// };

$(document).ready(function () {

   $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('fixed-header');
        } else {
            $('.header').removeClass('fixed-header');
        }
    });

  $('.main-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow: '.main-slider-prev',
    nextArrow: '.main-slider-next'
  });

  $('.review-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
  });

  $('.mnu-btn').click(function(){;
    $('.header').toggleClass('with-menu');
    $('.main-menu-wrap').slideToggle();
  });

   $('a[href^="#"], *[data-href^="#"]').on('click', function(e){
            e.preventDefault();
            var t = 1000;
            var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
            $('html,body').stop().animate({ scrollTop: $(d).offset().top }, t);
        });


  if(window.matchMedia("(max-width: 1024px)").matches){

  } 

  if(window.matchMedia("(max-width: 1024px)").matches){
    $(".main-menu-wrap").append($(".header-contacts"));
  }



});


})(jQuery);




