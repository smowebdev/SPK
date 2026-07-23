$(document).ready(function () {
  var $owl = $(".category-filter__list").owlCarousel({
    loop: false,
    margin: 16,
    nav: true,
    dots: false,
    autoWidth: true,
    navText: ["<span>&#10094;</span>", "<span>&#10095;</span>"],
  });

  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    $owl.trigger("refresh.owl.carousel");

    var filterValue = $(this).attr("data-filter");

    if (filterValue === "all") {
      $(".faq-item").fadeIn(300);
    } else {
      $(".faq-item").each(function () {
        if ($(this).attr("data-category") === filterValue) {
          $(this).fadeIn(300);
        } else {
          $(this).fadeOut(300);
        }
      });
    }
  });

  $(".faq-header").on("click", function () {
    var $item = $(this).closest(".faq-item");

    var $parentContainer = $item.parent();

    var $content = $item.find(".faq-content");

    $parentContainer
      .find(".faq-item")
      .not($item)
      .find(".faq-content")
      .slideUp(300);
    $parentContainer
      .find(".faq-item")
      .not($item)
      .find(".faq-header")
      .removeClass("active");

    $content.slideToggle(300);
    $(this).toggleClass("active");
  });

  $(window).on("resize", function () {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(function () {
      $(".category-filter__list").trigger("destroy.owl.carousel");
      $(".category-filter__list").owlCarousel({
        loop: false,
        margin: 16,
        nav: true,
        dots: false,
        autoWidth: true,
        navText: ["<span>&#10094;</span>", "<span>&#10095;</span>"],
      });
    }, 300);
  });

  const $modal = $(".team-modal");
  const $modalBody = $(".team-modal__body");

  $(".team-card__link").on("click", function () {
    const bioId = $(this).data("bio");
    const bioContent = $("#" + bioId).html();

    $modalBody.html(bioContent);

    $modal.addClass("active");
  });

  $(".team-modal__close, .team-modal__overlay").on("click", function () {
    $modal.removeClass("active");
  });

  // License Modal
  const $licenseModal = $(".license-modal");
  const $licenseModalImage = $(".license-modal img");

  $(".partner-benefits__license-caption").on("click", function (e) {
    e.preventDefault();

    const $card = $(this).closest(".partner-benefits__license");
    const $img = $card.find(".partner-benefits__license-image img");

    $licenseModalImage
      .attr("src", $img.attr("src"))
      .attr("alt", $img.attr("alt"));

    $licenseModal.addClass("active");
  });

  $(".license-modal__close, .license-modal__overlay").on("click", function () {
    $licenseModal.removeClass("active");
  });
});
