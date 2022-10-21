# Stringクラスの拡張
class String
  def to_amazon_url
    "https://www.amazon.co.jp/dp/#{self}"
  end

  def to_amazon_book_image
    "http://images-jp.amazon.com/images/P/#{self}.09.LZZZZZZZ.webp"
  end
end

def introduce(book)
  title = book.title
  desc  = book.desc
  isbn  = book.isbn
  url   = isbn.to_s.to_amazon_url
  image = isbn.to_s.to_amazon_book_image

  t = content_tag :h2, class: 'title' do title end
  i = image_tag(image)
  d = content_tag :p, class: 'desc' do desc end

  content_tag :div, class: 'book' do
    link_to url, target: '_blank' do
      (t + i + d)
    end
  end
end

# Nokogiri::HTML::Builder の使い方紹介
# content_tag の不便さを改善
# https://www.oiax.jp/rails/tips/nokogiri_html_builder.html
def table_of_users(users)
  markup do |m|
    m.table(id: 'users', class: 'ui table') do
      m.tr do
        m.th '姓'
        m.th '名'
        m.th '性別'
      end
      users.each do |u|
        attrs = {}
        attrs[:class] = 'admin' if u[:admin]
        m.tr(attrs) do
          m.td(:class => 'family_name bold') do
            m.text u[:family_name]
          end
          m.td u[:given_name]
          m.td u[:gender] == 'male' ? '男' : '女'
        end
      end
    end

    m.style do
      m << 'table { color: green; }'
    end
  end


end

# 日本語版 loremメソッド
def iroha
  IrohaObject
end
