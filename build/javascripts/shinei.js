/*===========================================================*/
/*印象編 4 最低限おぼえておきたい動き*/
/*===========================================================*/
// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime() {
  // 4-9 シャッ（左から）
  $('.bgLRextendTrigger').each(function () { //bgLRextendTriggerというクラス名が
    let elemPos = $(this).offset().top - 50; //要素より、50px上の
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('bgLRextend'); // 画面内に入ったらbgLRextendというクラス名を追記
    } else {
      $(this).removeClass('bgLRextend'); // 画面外に出たらbgLRextendというクラス名を外す
    }
  });
  $('.bgappearTrigger').each(function () { //bgappearTriggerというクラス名が
    let elemPos = $(this).offset().top - 50; //要素より、50px上の
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('bgappear'); // 画面内に入ったらbgappearというクラス名を追記
    } else {
      $(this).removeClass('bgappear'); // 画面外に出たらbgappearというクラス名を外す
    }
  });
  // 4-1 ふわっ（下から）
  $('.fadeUpTrigger').each(function () { //fadeUpTriggerというクラス名が
    let elemPos = $(this).offset().top - 50; //要素より、50px上の
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUp'); // 画面内に入ったらfadeUpというクラス名を追記
    } else {
      $(this).removeClass('fadeUp'); // 画面外に出たらfadeUpというクラス名を外す
    }
  });
  // 4-2 パタッ（左へ）
  $('.flipLeftTrigger').each(function () { //flipLeftTriggerというクラス名が
    let elemPos = $(this).offset().top - 50; //要素より、50px上の
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('flipLeft'); // 画面内に入ったらflipLeftというクラス名を追記
    } else {
      $(this).removeClass('flipLeft'); // 画面外に出たらflipLeftというクラス名を外す
    }
  });
}

/*===========================================================*/
/* 関数をまとめる*/
/*===========================================================*/
// 画面をリサイズしたら動かしたい場合の記述
// $(window).on('resize', function () {
//   sliderSet(); //機能編 9-4-1 ニュースティッカーの動きの関数を呼ぶ
// });
// 画面をスクロールをしたら動かしたい場合の記述
$(window).on("scroll", () => {
  PageTopAnime(); //機能編 8-1-3	ページの指定の高さを超えたら右から出現する関数を呼ぶ
  // PositionCheck(); //機能編 5-1-26 追従メニューの現在地ハイライトの関数を呼ぶ
  // ScrollAnime(); //機能編 5-1-26 追従メニューの現在地ハイライトの関数を呼ぶ
  fadeAnime(); //印象編 4 最低限おぼえておきたい動きの関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  $('.scrollgress').addClass('hidden');
  $('#footer').addClass('hidden');
  // $('.openbtn').css({"border-left": "none"});
  // border-left: 2px solid #333;

  $("#splash-logo").delay(1200).fadeOut('slow'); //ロゴを1.2秒でフェードアウトする記述
  //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる



  $("#splash").delay(500).fadeOut('slow', function () { //機能編 4-2-1 背景色が伸びる（下から上）が動作した後に下記アニメーションを実行
    $('body').addClass('appear'); //機能編 4-2-1 背景色が伸びる（下から上）
    // sliderSet(); //機能編  9-4-1 ニュースティッカーの動きの関数を呼ぶ
    // PositionCheck(); //機能編  5-1-26 追従メニューの現在地ハイライトの関数を呼ぶ
    // ScrollAnime(); //機能編 5-1-26 追従メニューの現在地ハイライトの関数を呼ぶ
    PageTopAnime(); //機能編  8-1-3	ページの指定の高さを超えたら右から出現する関数を呼ぶ
    /*機能編  9-2-2	任意の場所をクリックすると隠れていた内容が開き、先に開いていた内容が閉じる*/

    //一秒遅らせて実行
     $('.scrollgress').delay(1000).queue(function(){
       $('.scrollgress').removeClass('hidden');
     });

     $('#footer').delay(1500).queue(function(){
       $('#footer').removeClass('hidden');
     });




  });
  //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
  /*===========================================================*/
  /*機能編  4-2-1 背景色が伸びる（下から上） */
  /*===========================================================*/
  //=====ここから背景が伸びた後に動かしたいJSをまとめる
  $('.splashbg').on('animationend', () => {
    fadeAnime(); //印象編 4 最低限おぼえておきたい動きの関数を呼ぶ
  });
  //=====ここまで背景が伸びた後に動かしたいJSをまとめる
}); // ここまでページが読み込まれたらすぐに動かしたい場合の記述
