/*===========================================================*/
/*機能編  5-1-26 追従メニューの現在地ハイライト*/
/*===========================================================*/
//現在地を取得するための設定を関数でまとめる

let scrollPoints = [];

// .scroll-pointというクラス名がついたエリアの位置を取得する
const getScrollPoints = () => {

  // headerの高さを取得
  let headerH = $("#header").outerHeight(true);

  // .scroll-pointクラスがついたエリアからトップまでの距離を計算して設定
  $(".scroll-point").each(function(i){
    // コンテンツの少し上で現在地にするため、
    // 追従するheader分の高さからさらに10px分を引く
    scrollPoints[i] = Math.round(parseInt($(this).offset().top - headerH - 10));
  });
}

//ナビゲーションにcurrentクラスを付与する
const addCurrentClassToNavigationList = () => {
  let scroll = Math.round($(window).scrollTop());
  let navElem = $("#pc-nav li");
  $("#pc-nav li").removeClass('current'); // 全ナビの現在地クラスを除去

  // スクロール量に応じて、currentクラス付与
  for (let i = scrollPoints.length - 1; i >= 0; i--){
    if (scroll >= scrollPoints[i]) {
      $(navElem[i]).addClass('current');
      break;
    }
  }
}

$(window).scroll(() => {
  getScrollPoints();
  addCurrentClassToNavigationList();
});

$("#splash").delay(1500).fadeOut('slow', () => {
  getScrollPoints();
  addCurrentClassToNavigationList();
});
