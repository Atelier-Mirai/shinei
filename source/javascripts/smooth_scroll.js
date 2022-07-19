// ナビゲーションをクリックした際のスムーススクロール
$('#pc-nav a, #g-nav a').on("click", () => {
  let elemHash     = $(this).attr('href');
  let headerHeight = $("#header").outerHeight(true); // header の高さ
  let postion      = Math.round($(elemHash).offset().top - headerHeight);

  // 取得した位置にスクロール
  $('body,html').animate({
    scrollTop: postion
  }, 500);
  return false;
});
