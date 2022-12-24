function fadeAnime() {

  // 4-9 シャッ（左から）
  $('.bgLRextendTrigger').each(function () {
    let elemPos      = $(this).offset().top - 50; //要素より、50px上の
    let scroll       = $(window).scrollTop();
    let windowHeight = $(window).height();

    // 画面内に入ったらクラス名付与
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('bgLRextend');
    // 画面外に出たらクラス名削除
    } else {
      $(this).removeClass('bgLRextend');
    }
  });

  $('.bgappearTrigger').each(function () {
    let elemPos      = $(this).offset().top - 50; //要素より、50px上の
    let scroll       = $(window).scrollTop();
    let windowHeight = $(window).height();

    // 画面内に入ったらクラス名付与
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('bgappear');
    // 画面外に出たらクラス名削除
    } else {
      $(this).removeClass('bgappear');
    }
  });

  // 4-1 ふわっ（下から）
  $('.fadeUpTrigger').each(function () {
    let elemPos      = $(this).offset().top - 50; //要素より、50px上の
    let scroll       = $(window).scrollTop();
    let windowHeight = $(window).height();

    if (scroll >= elemPos - windowHeight) {
      // 画面内に入ったらクラス名付与
      $(this).addClass('fadeUp');
    // 画面外に出たらクラス名削除
    } else {
      $(this).removeClass('fadeUp');
    }
  });

  // 4-2 パタッ（左へ）
  $('.flipLeftTrigger').each(function () {
    let elemPos      = $(this).offset().top - 50; //要素より、50px上の
    let scroll       = $(window).scrollTop();
    let windowHeight = $(window).height();

    // 画面内に入ったらクラス名付与
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('flipLeft');
    // 画面外に出たらクラス名削除
    } else {
      $(this).removeClass('flipLeft');
    }
  });
}

$(window).on("scroll", () => {
  fadeAnime();
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  $('.scrollgress').addClass('hidden');
  $('#footer').addClass('hidden');
  $("#splash-logo").delay(1200).fadeOut('slow'); //ロゴを1.2秒でフェードアウト

  // スプラッシュ動作後、下記のアニメーションを実行
  $("#splash").delay(500).fadeOut('slow', function () {
    $('body').addClass('appear'); //機能編 4-2-1 背景色が伸びる（下から上）

    //一秒遅らせて実行
     $('.scrollgress').delay(1000).queue(function(){
       $('.scrollgress').removeClass('hidden');
     });

     $('#footer').delay(1500).queue(function(){
       $('#footer').removeClass('hidden');
     });
  });

  $('.splashbg').on('animationend', () => {
    fadeAnime();
  });
});
