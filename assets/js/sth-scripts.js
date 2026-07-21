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
  //
  $(".choose-programme__box").on("click", function (e) {
    e.preventDefault();
    $(".choose-programme__box")
      .removeClass("selected")
      .find(".box-btn span")
      .text(function () {
        const label = $(this)
          .closest(".box-btn")
          .closest(".choose-programme__box")
          .find(".box-label")
          .text()
          .trim();
        return "Select " + label;
      });

    const $box = $(this).closest(".choose-programme__box");
    const data_box = $(this)
      .closest(".choose-programme__box")
      .attr("data-programe");
    $(".configure-family").slideUp(300);
    $("#configure_" + data_box).slideDown(300);
    $box.addClass("selected");
    $(this).find("span").text("Selected");
  });

  $(".intro-btn").on("click", function (e) {
    e.preventDefault();

    if ($(".choose-programme__box.selected").length) {
      $(".wraper-configure_fc").show();
      const data_prgrame = $(".choose-programme__box.selected").attr(
        "data-programe"
      );
      $("#configure_" + data_prgrame).slideDown(300);
      // $(".configure-family").slideDown(300);
      $(".full-cost__intro").slideUp(300);
    } else {
      $("html, body").animate(
        {
          scrollTop: $(".choose-programme__content").offset().top,
        },
        500
      );
    }
  });

  $(".sth-spouse-status").on("click", function () {
    $(this).toggleClass("active");
    $(".added-application-fee").slideToggle(300);
  });

  $(".anything-anusual-head").on("click", function () {
    $(this).parent().find(".anything-anusual-content").slideToggle(300);
    $(this).toggleClass("active");
  });

  $(".btn-estimate").on("click", function () {
    $(this).parent().find(".wraper-estimate").slideToggle(300);
  });

  $(".btn-show-popup").click(function (e) {
    event.preventDefault();
    $(".sth-right-family").addClass("active");
  });
  $(".overlay-family").click(function () {
    $(".sth-right-family").removeClass("active");
  });
  $(".btn-close-family").click(function () {
    $(".sth-right-family").removeClass("active");
  });
});

jQuery(function ($) {
  const MIN = 0;
  const MAX = 99;

  function updateButton($wrapper) {
    const value = parseInt($wrapper.find('input[type="number"]').val()) || 0;

    $wrapper.find(".sth-btn-prev").toggleClass("disable", value <= MIN);
    $wrapper.find(".sth-btn-next").toggleClass("disable", value >= MAX);
  }

  $(".wraper-fc-number").on("click", ".sth-btn-next", function () {
    if ($(this).hasClass("disable")) return;

    const $wrapper = $(this).closest(".wraper-fc-number");
    const $input = $wrapper.find('input[type="number"]');

    let value = parseInt($input.val()) || 0;
    value = Math.min(MAX, value + 1);

    $input.val(value).trigger("change");
    updateButton($wrapper);
  });

  $(".wraper-fc-number").on("click", ".sth-btn-prev", function () {
    if ($(this).hasClass("disable")) return;

    const $wrapper = $(this).closest(".wraper-fc-number");
    const $input = $wrapper.find('input[type="number"]');

    let value = parseInt($input.val()) || 0;
    value = Math.max(MIN, value - 1);

    $input.val(value).trigger("change");
    updateButton($wrapper);
  });

  $('.wraper-fc-number input[type="number"]').on("input change", function () {
    let value = parseInt($(this).val());

    if (isNaN(value)) value = MIN;
    if (value < MIN) value = MIN;
    if (value > MAX) value = MAX;

    $(this).val(value);

    updateButton($(this).closest(".wraper-fc-number"));
  });

  $(".wraper-fc-number").each(function () {
    updateButton($(this));
  });
});
