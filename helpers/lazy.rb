module Padrino
  module Helpers
    module AssetTagHelpers
      def image_tag(url, options={})
        options = { :src => image_path(url) }.update(options)
        options[:alt] ||= image_alt(url) unless url.to_s =~ /\A(?:cid|data):|\A\Z/

        # img タグに loading="lazy" を追加する
        options[:loading] ||= :lazy

        # 画像名から自動で img タグのalt属性, width属性, height属性を付与する
        # (Middleman::Extensions::AutomaticAltTags より)
        unless url.include?('://')
          options[:alt]    ||= ''
          options[:width]  ||= ''
          options[:height] ||= ''

          real_path = url.dup
          real_path = File.join(config[:images_dir], real_path) unless real_path.start_with?('/')

          file = app.files.find(:source, real_path)

          if file && file[:full_path].exist?
            # alt 属性
            if options[:alt].empty?
              options[:alt] = File.basename(file[:full_path].to_s, '.*').capitalize!
            end

            # width属性, height属性
            if options[:width].empty? || options[:height].empty?
              w, h = FastImage.size(file[:full_path])
              options[:width]  = w
              options[:height] = h
            end
          end
        end

        tag(:img, options)
      end
    end
  end
end
