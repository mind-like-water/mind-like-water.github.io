export default function headerMenu() {
  const $btn = $('.js-toggleMenu');
  const $menu = $('.o-headerMenuBody__contents');

  $btn.on('click', function(){
    $(this).toggleClass('is-active');

    let icon;
    icon = $(this).hasClass('is-active') ? '#icon_close2' : '#icon_menu_b';
    $(this).find('use').attr('xlink:href', icon);

    $menu.slideToggle(400);

  });
}
