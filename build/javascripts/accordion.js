/*===========================================================
  機能編 9-2-2	アコーディオンパネル
  任意の場所をクリックすると隠れていた内容が開き、
  先に開いていた内容を閉じる
/*===========================================================*/
$('.accordion-area .title').on('click', function () {
  $('.box').slideUp(500); // 全アコーディオンを閉じる
  let findElem = $(this).next(".box"); // .box要素を取得
  if ($(this).hasClass('close')) {
    $(this).removeClass('close');
  } else {
    $('.close').removeClass('close');
    $(this).addClass('close');
    $(findElem).slideDown(500); // アコーディオンを開く
  }
});

$(window).on('load', function () {
  $(".open").each(function (index, element) {
    let title = $(element).children('.title');
    $(title).addClass('close');
    let box = $(element).children('.box');
    $(box).slideDown(500); //アコーディオンを開く
  });
});
