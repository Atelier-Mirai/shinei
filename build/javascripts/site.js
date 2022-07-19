$(() => {
  // ドロップダウンメニュー
  $('.ui.dropdown').dropdown({
    on: 'hover'
  })

  // flashをxボタンで消せる
  $('.message .close').on('click', function() {
    $(this).closest('.message')
           .transition('fade')
  })

  // モーダルウィンドウ
  $('.show_about').on('click', function() {
    $('.ui.modal').modal('show')
  })

  // タブ
  $('.ui.tabular.menu .item').tab()
})
