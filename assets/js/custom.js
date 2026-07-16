$(function () {
  $(".choose-programme__box .box-btn").on("click", function (e) {
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

    $box.addClass("selected");
    $(this).find("span").text("Selected");
  });
  $(".intro-btn").on("click", function (e) {
    e.preventDefault();

    $(".configure-family").slideDown(300);
    $(".full-cost__intro").slideUp(300);
  });
});
