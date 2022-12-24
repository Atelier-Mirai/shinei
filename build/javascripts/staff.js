/*===========================================================*/
/* 印象編 4-12 順番に現れる（CSS x jQuery）*/
/*===========================================================*/
const delayScrollAnimation = () => {
  let time = 0.2; //遅延時間を増やす秒数の値
  let value = time;
  $('.delayScroll').each(function () {
    let parent       = this; //親要素を取得
    let elemPos      = $(this).offset().top; //要素の位置まで来たら
    let scroll       = $(window).scrollTop(); //スクロール値を取得
    let windowHeight = $(window).height(); //画面の高さを取得
    let childs       = $(this).children(); //子要素
    if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) { //指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
      $(childs).each(function () {
        if (!$(this).hasClass("fadeUp")) { //アニメーションのクラス名が指定されているかどうかをチェック
          $(parent).addClass("play"); //親要素にクラス名playを追加
          $(this).css("animation-delay", value + "s"); //アニメーション遅延のCSS animation-delayを追加し
          $(this).addClass("fadeUp"); //アニメーションのクラス名を追加
          value = value + time; //delay時間を増加させる
          //全ての処理を終わったらplayを外す
          let index = $(childs).index(this);
          if ((childs.length - 1) == index) {
            $(parent).removeClass("play");
          }
        }
      })
    } else {
      $(childs).removeClass("fadeUp"); //アニメーションのクラス名を削除
      value = time; //delay初期値の数値に戻す
    }
  })
}

$(window).on('load', function () {
  delayScrollAnimation();
});

$(window).scroll(function () {
  delayScrollAnimation();
});
