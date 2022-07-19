/*===========================================================*/
/*機能編  5-1-12 クリックしたらメニューが下から上に出現*/
/*===========================================================*/
$(".openbtn").on("click", () => {
  $(this).toggleClass('active');
  $("#g-nav").toggleClass('panelactive');
});

$("#g-nav a").on("click", () => {
  $(".openbtn").removeClass('active');
  $("#g-nav").removeClass('panelactive');
});
