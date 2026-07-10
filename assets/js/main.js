//
// This is The Scripts used for Simply Theme
//
function main() {
	(function () {
		'use strict'
		//Script
		//-----------------------------------
		jQuery(document).ready(function ($) {
			var wd = $(window).width();

			var wd = jQuery(window).width();
			var $wrap = $('.site-header__lang');
			var $toggle = $wrap.find('.site-header__lang-toggle');
			var $current = $wrap.find('.site-header__lang-current');
			var $list = $wrap.find('.site-header__lang-list');
			var $items = $wrap.find('.site-header__lang-item');

			$toggle.on('click', function (e) {
				e.stopPropagation();
				$wrap.toggleClass('active');
				$list.stop(true, true).slideToggle(200);
			});

			$items.on('click', 'a', function (e) {
				e.preventDefault();
				var $item = $(this).closest('.site-header__lang-item');
				$items.removeClass('active');
				$item.addClass('active');
				$current.text($(this).text());
				$wrap.removeClass('active');
				$list.stop(true, true).slideUp(200);
			});

			$(document).on('click', function () {
				if ($wrap.hasClass('active')) {
					$wrap.removeClass('active');
					$list.stop(true, true).slideUp(200);
				}
			});

			$list.on('click', function (e) {
				e.stopPropagation();
			});

			$(".hambuger-mobile").on("click", function () {
				$(this).toggleClass("exit");
				$(".site-header__nav").slideToggle();
			});
			function bindMobileMenu() {
				if ($(window).width() <= 1200) {

					$('.site-header__menu > li:has(.sub-menu) > a')
						.off('click.mobileMenu')
						.on('click.mobileMenu', function (e) {

							const $a = $(this);
							const $li = $a.parent();
							const href = $a.attr('href');

							if (!href || href === '#') {
								e.preventDefault();

								$li.toggleClass('active');
								$li.children('.sub-menu').stop(true, true).slideToggle(200);
								$a.find('svg').toggleClass('is-open');

								return;
							}

							if (!$li.hasClass('active')) {
								e.preventDefault();

								$li.addClass('active');
								$li.children('.sub-menu').stop(true, true).slideDown(200);
								$a.find('svg').addClass('is-open');
							}
						});

				} else {
					$('.site-header__menu > li > a').off('click.mobileMenu');

					$('.sub-menu').removeAttr('style');
					$('.site-header__menu li').removeClass('active');
					$('.site-header__menu svg').removeClass('is-open');
				}
			}

			bindMobileMenu();
			$(window).on('resize', bindMobileMenu);

			var $section = $('.video-section');
			var $video = $section.find('.video-section__video')[0];
			var $playBtn = $section.find('.video-section__play');

			$playBtn.on('click', function () {
				$video.setAttribute('controls', 'controls');
				$video.play();
			});

			$($video).on('play', function () {
				$section.addClass('is-playing');
				$playBtn.hide();
			});

			$($video).on('pause ended', function () {
				$section.removeClass('is-playing');
				$video.removeAttribute('controls');
				$playBtn.show();
			});
		});
		var $carousel = $('.why-choose__carousel');

		$carousel.owlCarousel({
			autoWidth: true,
			margin: 24,
			nav: false,
			dots: false,
			loop: false,
			onInitialized: updateNav,
			onTranslated: updateNav
		});

		$('.why-choose__nav-prev').on('click', function () {
			$carousel.trigger('prev.owl.carousel');
		});

		$('.why-choose__nav-next').on('click', function () {
			$carousel.trigger('next.owl.carousel');
		});

		function updateNav(event) {
			var carousel = event.relatedTarget;
			var current = carousel.current();

			$('.why-choose__nav-prev, .why-choose__nav-next').removeClass('active');

			if (current > 0) {
				$('.why-choose__nav-prev').addClass('active');
			}

			if (current < carousel.maximum()) {
				$('.why-choose__nav-next').addClass('active');
			}
		}


	}());
}
main();