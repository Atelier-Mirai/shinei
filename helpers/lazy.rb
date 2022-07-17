module Padrino
  module Helpers
    module AssetTagHelpers
      def image_tag(url, options={})
        options = { :src => image_path(url) }.update(options)
        options[:alt] ||= image_alt(url) unless url.to_s =~ /\A(?:cid|data):|\A\Z/

        # img タグに loading="lazy" を追加する
        options[:loading] ||= :lazy

        # 画像名から自動で img タグのalt属性を付与する
        # (Middleman::Extensions::AutomaticAltTags より)
        unless url.include?('://')
          options[:alt] ||= ''

          real_path = url.dup
          real_path = File.join(config[:images_dir], real_path) unless real_path.start_with?('/')

          file = app.files.find(:source, real_path)

          if file && file[:full_path].exist? && options[:alt].empty?
            begin
              alt_text = File.basename(file[:full_path].to_s, '.*')
              alt_text.capitalize!
              options[:alt] = alt_text
            end
          end
        end

        tag(:img, options)
      end
    end
  end
end
