/*===========================================================*/
/*機能編  9-4-1 ニュースティッカー*/
/*===========================================================*/
const sliderSet = () => {
  let sliderFlag  = false;
  let breakpoint  = 768;
  let windowWidth = window.innerWidth;
  let slider;

  //768px以上は1行でスライダー表示
  if (windowWidth >= breakpoint && !sliderFlag) {
    sliderFlag = true;
    slider = $('.slider').bxSlider({
     mode: 'vertical', // 縦スライド指定
     controls: false,  // 前後のコントロールを非表示
     auto: true,       // 自動的にスライド
     pager: false      // ページ送り無効化
   });
  } else if (windowWidth < breakpoint && sliderFlag) {
    //bxSliderのdestroySliderメソッドを呼び、スライダーの動きを除去する
    slider.destroySlider();
    sliderFlag = false;
  }
}

$(window).on('resize', () => {
  sliderSet();
});

$(window).on('load', () => {
  sliderSet();
});

$("#splash").delay(1500).fadeOut('slow', () => {
  sliderSet();
});
