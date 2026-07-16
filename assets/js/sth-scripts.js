jQuery(document).ready(function ($) {
  $(".btn-zoom").click(function (e) {
    e.preventDefault();
    $(this).parent().find(".verified-popup-zoom").addClass("active");
  });
  $(".overlay-verified").click(function () {
    $(".verified-popup-zoom").removeClass("active");
  });
  $(".btn-verified-close").click(function () {
    $(".verified-popup-zoom").removeClass("active");
  });
});
