# JavaScript圧縮用ライブラリを読み込む
require "uglifier"

# コード変更すると、自動再読み込みされる
activate :livereload

# 相対URLを使う
activate :relative_assets
set :relative_links, true

# ベンダープリフィックスを自動的に付与する
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# レイアウトファイルの指定
set :layout, "site"
page "index.html", layout: "top"
# page "no_layout.html", layout: false

# ビルド時の設定
configure :build do
  # HTML圧縮
  activate :minify_html
  # CSS圧縮
  activate :minify_css
  # JavaScript圧縮
  activate :minify_javascript,
    compressor: proc {
      ::Uglifier.new(
        mangle: { toplevel: true },
        compress: { unsafe: true },
        harmony: true
      )
    }
  # アセットファイルのURLにハッシュを追加
  activate :asset_hash
  # テキストファイルのgzip圧縮
  activate :gzip
end

# Slim の設定
# set :slim, {
#   # デバック用にhtmlをきれいにインデントし属性をソートしない
#   # (html, css, javascript の圧縮も無効化すると、
#   #  学習用に読みやすいHTMLが出力される )
#   pretty: true, sort_attrs: false
# }

# 動的サイトの設定例
# data.cats.each do |neko|
#   proxy "/#{neko.name}.html", "/neko_template.html", locals: { neko_data: neko }, ignore: true
# end
