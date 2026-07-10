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
    var $content = $(this).siblings(".faq-content");
    $(".faq-content").not($content).slideUp(300);
    $(".faq-header").not(this).removeClass("active");
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

  $(".team-card").on("click", function () {
    $("#team-popup").css("display", "flex");
  });

  $(".close-btn").on("click", function () {
    $("#team-popup").css("display", "none");
  });
});
