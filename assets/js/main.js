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



		});



	}());
}
main();