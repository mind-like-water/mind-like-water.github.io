export default function selectConsultant(){

  const $btn = $('.js-switchTab');
  const $casette = $('.c-consultantCasette');
  const $parent = $('.p-highCareerConsultant__contents');

  // 必要なパラメータを取得する
  let search = location.search;
  let param = location.search.slice(-1);

  if(search.indexOf('?category=') >= 0 && !isNaN(param)){
    activateBtn($btn[param]);
    filteringPeople(param);
  }

  $btn.on('click', function(){
    let index = $btn.index(this);

    activateBtn(this);
    filteringPeople(index);

  });

  function activateBtn(el) {
    $btn.removeClass('is-active');
    $(el).addClass('is-active');
  }

  function filteringPeople(num){
    $casette.detach();
    if(num == 0 || null || undefined) {
      $casette.appendTo($parent);
    } else {
      $casette.filter(`[data-filter="${num}"]`).appendTo($parent);
    }
  }

}
