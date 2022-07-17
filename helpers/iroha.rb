# middleman/middleman-core/lib/middleman-core/extensions/lorem.rbより
require 'date'

module IrohaObject
  class << self
    # Words for use in lorem text
    # ポラーノの広場 坊ちゃん 高瀬舟 杜子春 より
  WORDS = %w[あの イーハトーヴォ の すきとおった 風 夏 でも 底 に 冷たさ を もつ 青いそら うつくしい 森 で 飾られた モリーオ市 郊外の ぎらぎら ひかる 草の波 また そのなかで いっしょ なった たくさんの ひとたち ファゼーロ ロザーロ 羊飼の ミーロや 顔の赤いこどもたち 地主のテーモ 山猫博士の ボーガント・デストゥパーゴなど いまこの暗い巨きな石の建物のなかで考え いる みんな むかし 風のなつかしい青い幻燈のよう 思われます わたくし いつかの小さなみだし つけながら しずか あの年の イーハトーヴォの 五月から 十月まで 書きつけましょう 親譲りの 無鉄砲で 小供の 時から 損ばかり している 小学校 居る 時分 学校の 二階から 飛び降り 一週間ほど 腰を 抜かした事がある なぜ そんな 無闇 した 聞く 人が あるかも 知れぬ 別段 深い 理由 でもない 新築の 二階から 首 出し いたら 同級生の 一人が 冗談 いくら 威張っても そこから 飛び降りる事 出来まい 弱虫やーい 囃したからである 小使に負ぶさって 帰って 来た時 おやじが 大きな眼をし 二階ぐらいから 飛び降りて 腰を 抜かす奴が あるかと 云ったから この次は 抜かさず 飛んで見せます 答えた 高瀬舟 京都の高瀬川 上下する 小舟である 徳川時代 京都の 罪人が 遠島 申し渡される 本人の 親類が 牢屋敷へ 呼び出され そこで 暇乞 することを 許された それから 罪人 高瀬舟 載せられ 大阪へ 廻されること であつた それ 護送するの 京都 町奉行の 配下 ゐる同心で 此同心 罪人の 親類の 中で 主立つた一人 大阪まで 同船 させることを 許す 慣例であつた これ 上へ 通つた事では ないが 所謂 大目 見るのであつた 默許であつた 或春の 日暮です 唐の 都 洛陽の 西の 門の 下 ぼんやり 空 仰いでゐる 一人の 若者が ありました 若者の 名は 杜子春 いつ 元は 金持の息子でしたが 今は 財産を 費ひ尽し その日の 暮しにも 困る位 憐な身分 なつて ゐるのです 何しろ その頃 洛陽 いへば 天下 並ぶもののない 繁昌 極めた 都ですから 往来 まだしつきりなく 人や車が 通つて ゐました 門一ぱい 当つてゐる 油のやうな 夕日の 光の中 老人の かぶつた 紗しやの 帽子や 土耳古の 女の 金の 耳環や 白馬 飾つた 色糸の 手綱が 絶えず 流れて 行く 容子は まるで 画のやうな 美しさです].freeze

    # Get some number of placeholder words
    # @param [Fixnum] total
    # @return [String]
    def tango(total = 1)
      (1..total).map do
        WORDS.sample
      end.join(' ')
    end

    # Get some number of placeholder sentences
    # @param [Fixnum] total
    # @return [String]
    def bunsho(total = 1)
      "　" + (1..total).map do
        tango(rand(4..15))
      end.join('。 ')
    end

    # Get some number of placeholder paragraphs
    # @param [Fixnum] total
    # @return [String]
    def danraku(total = 1)
      (1..total).map do
        bunsho(rand(3..7))
      end.join("<br>").html_safe + "<br>".html_safe
    end

    # 漢数字を数字に変換
    # https://qiita.com/alfa/items/24611f664949709f530d
    def convert_kansuji(text)
      text.tr('〇一二三四五六七八九', '0123456789')
          .gsub(/(\d+)?十(\d+)?/) { ($1 || 1).to_i * 10            + $2.to_i }
          .gsub(/(\d+)?百(\d+)?/) { ($1 || 1).to_i * 100           + $2.to_i }
          .gsub(/(\d+)?千(\d+)?/) { ($1 || 1).to_i * 1000          + $2.to_i }
          .gsub(/(\d+)万(\d+)?/)  {        $1.to_i * 10000         + $2.to_i }
          .gsub(/(\d+)億(\d+)?/)  {        $1.to_i * 100000000     + $2.to_i }
          .gsub(/(\d+)兆(\d+)?/)  {        $1.to_i * 1000000000000 + $2.to_i }
    end

    def to_kan(text)
      text = text.to_s
      text.tr('0123456789', '〇一二三四五六七八九').tr('〇', '')
    end

    def to_kansuji(num)
      return '元' if num == '元'

      num = num.to_i
      tens_place, ones_place = num.divmod(10)
      case tens_place
      when 0
        to_kan(ones_place)
      when 1
        '十' + to_kan(ones_place)
      when 2..9
        to_kan(tens_place) + '十' + to_kan(ones_place)
      end
    end

    # https://qiita.com/naopontan@github/items/c3e9c8d468163e56ed22
    # Dateオブジェクトから和暦を得る
    def wareki(date = Date.today)
      _wareki, mon, day = date.jisx0301.split(".")
      gengou, year = _wareki.partition(/\d+/).take(2) # 元号と和暦の年に分解
      # 元号のアルファベットを漢字に変換
      gengou.sub!(/[MTSHR]/,
                     'M' => '明治',
                     'T' => '大正',
                     'S' => '昭和',
                     'H' => '平成',
                     'R' => '令和')
      # 和暦の日付を返す
      year = '元' if year == '01'
      "#{gengou}#{to_kansuji(year)}年#{to_kansuji(mon)}月#{to_kansuji(day)}日"
    end

    # Get a placeholder date
    # @param [String] fmt
    # @return [String]
    def hiduke
      y = rand(1900..2030)
      m = rand(1..12)
      d = rand(1..31)
      wareki(Date.new(y, m, d))
    end

    # Get a placeholder first name
    # 名字由来ネット https://myoji-yurai.net より
    # @return [String]
    def myoji
      %w[佐藤 鈴木 高橋 田中 伊藤 渡辺 山本 中村 小林 加藤 吉田 山田 佐々木 山口 松本 井上 木村 林 斎藤 清水 山崎 森 池田 橋本 阿部 石川 山下 中島 石井 小川 前田 岡田 長谷川 藤田 後藤 近藤 村上 遠藤 青木 坂本 斉藤 福田 太田 西村 藤井 岡本 金子 藤原 三浦 中野 中川 原田 松田 竹内 小野 田村 中山 和田 石田 森田 上田 原 内田 柴田 酒井 宮崎 横山 高木 安藤 宮本 大野 小島 谷口 工藤 今井 高田 増田 丸山 杉山 村田 大塚 新井 小山 平野 藤本 河野 上野 武田 野口 松井 千葉 菅原 岩崎 木下 久保 佐野 野村 松尾 菊地 市川 杉本 古川 大西 島田 水野 桜井 高野 渡部 吉川 山内 西田 飯田 菊池 西川 小松 北村 安田 五十嵐 川口 平田 関 中田 久保田 服部 東 岩田 川崎 土屋 福島 本田 辻 樋口 秋山 田口 永井 山中 中西 吉村 川上 石原 大橋 松岡 浜田 馬場 森本 矢野 浅野 星野 松下 大久保 吉岡 小池 野田 荒木 大谷 松浦 熊谷 内藤 黒田 尾崎 川村 永田 望月 松村 田辺 堀 荒井 大島 菅野 平井 早川 西山 栗原 広瀬 横田 石橋 岩本 萩原 片山 関口 宮田 大石 本間 高山 須藤 吉野 岡崎 小田 伊東 鎌田 篠原 上原 小西 松原 福井 古賀 成田 大森 小泉 南 奥村 内山 沢田 桑原 三宅 片岡 川島 富田 杉浦 岡 奥田 八木 小沢 松永 北川 河合 平山 関根 牧野 白石 今村 寺田 青山 中尾 小倉 渋谷 上村 小野寺 大山 岡村 足立 坂口 天野 多田 佐久間 根本 豊田 田島 飯塚 村山 角田 西 武藤 白井 竹田 宮下 塚本 榎本 坂田 児玉 神谷 水谷 坂井 齋藤 小原 浅井].sample
    end

    # 赤ちゃんの名前　年別ランキング http://www.tonsuke.com/nebin.html より
    # 62人
    def otoko
      %w[誠 和夫 明 修 豊 勉 博 勝 進 直樹 秀樹 聡 和彦 淳 隆 大介 大輔 哲也 学 洋平 亮 優 達也 翔 健太郎 大樹 徹 大貴 和也 雄太 清 稔 茂 浩 健一 翔太 健太 拓也 勇 浩一 剛 弘 実 浩二 翼 勝利 大輝 英樹 祐介 翔平 駿 勲 昇 竜也 貴大 浩之 健 博之 亮太 大地 正 崇].sample
    end

    # 67人
    def onna
      %w[久美子 啓子 恵美子 美代子 京子 順子 由美子 明美 美智子 典子 悦子 ゆかり 智子 真由美 和子 幸子 恵子 直美 美穂 美香 由美 優子 美紀 友美 理恵 陽子 彩香 香織 舞 裕子 彩花 愛美 千尋 洋子 愛 恵 絵美 美咲 彩 麻衣 麻美 沙織 萌 節子 成美 里奈 茜 弘子 浩子 純子 恵美 遥 千夏 葵 勝子 直子 裕美 智美 明日香 あゆみ 信子 めぐみ 由佳 桃子 瞳 麻衣子 早紀].sample
    end

    # Get a placeholder last name
    # @return [String]
    def namae
      # 出生比率 男 : 女 = 105 : 100
      case rand(1..205)
      when 1..105
        otoko
      when 106..205
        onna
      end
    end

    def shimei
      "#{myoji} #{namae}"
    end

    # Get a placeholder email address
    # https://freesoft-100.com/community/freemail.html より
    # @return [String]
    def email
      domains = %w[example.com example.net example.org example.jp example.co.jp example.ne.jp]
      names   = %w[sato suzuki takahashi tanaka ito watanabe yamamoto nakamura kobayashi kato yoshida yamada]
      "#{names.sample}@#{domains.sample}"
    end

    # Get a placeholder image, using placehold.it by default
    # @param [String] size
    # @param [Hash] options
    # @return [String]
    def image(size, options_hash = {})
      domain           = options_hash[:domain] || 'https://placehold.it'
      src_array        = ["#{domain}/#{size}"]
      hex              = %w[a b c d e f 0 1 2 3 4 5 6 7 8 9]
      background_color = options_hash[:background_color]
      color            = options_hash[:color]

      if options_hash[:random_color]
        background_color = hex.sample(6).join
        color = hex.sample(6).join
      end

      src_array << "/#{background_color.sub(/^#/, '')}" if background_color
      src_array << '/ccc' if background_color.nil? && color
      src_array << "/#{color.sub(/^#/, '')}" if color
      src_array << "&text=#{Rack::Utils.escape(options_hash[:text])}" if options_hash[:text]

      src_array.join
    end
  end
end
