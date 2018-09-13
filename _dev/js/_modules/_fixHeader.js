export default function fixHeader() {
  const $header = $('header');
  const $hiddenHeader = $('.o-header--fixed');
  const h = $header.outerHeight();

  const init = function(){
    $hiddenHeader.removeClass('is-show');
    $hiddenHeader.css('display', '');
  };

  const handleScroll = function(){
    console.log('実行してるぽよ');
    let pos = $(window).scrollTop();
    if (pos >= h) {
      $hiddenHeader.addClass('is-show');
    } else {
      init();
    }
  };

  $(window).on('load resize', function(){
    init();
    let w = $(window).width();
    if (w >= 940) {
      $(window).on('scroll', handleScroll);
    }
    // TODO: 画面幅が940以下の時も何故かhandleScrollが実行されてしまう怪現象を竹田さんに見てもらいたい

  });


}
