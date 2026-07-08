// const swiper = new Swiper(".faq-swiper", {
//   slidesPerView: "auto",
//   spaceBetween: 16,
//   observer: true,
//   observeParents: true,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   watchOverflow: true,
// });

$(document).ready(function () {
  $(".faq-owl-carousel").owlCarousel({
    loop: false,
    margin: 16, // Khoảng cách giữa các button
    nav: true, // Bật nút điều hướng
    dots: false, // Tắt chấm tròn
    autoWidth: true, // Rất quan trọng: giữ đúng kích thước nút theo text
    navText: ["", ""], // Bạn dùng icon/text tùy ý vào đây
    responsive: {
      0: { items: 2 },
      600: { items: 4 },
      1000: { items: 6 },
    },
  });

  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

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
    $content.slideToggle(300);
  });
});
