/*========================================================================*/
/*機能編 8-1-3ページの指定の高さを超えたら「先頭へ戻る」ボタンが右から出現*/
/*========================================================================*/
const PageTopAnime = () => {
  let scroll = $(window).scrollTop();
  if (scroll >= 200) {
    $('#page-top').removeClass('RightMove');
    $('#page-top').addClass('LeftMove');
  } else {
    if ($('#page-top').hasClass('LeftMove')) {
      $('#page-top').removeClass('LeftMove');
      $('#page-top').addClass('RightMove');
    }
  }
}

$('#page-top').on("click", () => {
  $('body,html').animate({
    scrollTop: 0
  }, 500);
  return false;
});
