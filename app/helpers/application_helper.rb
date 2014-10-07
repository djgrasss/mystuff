require 'rqrcode'

module ApplicationHelper
  def full_title(page_title)
    base_title = "Engex"
    if page_title.empty?
      base_title
    else
      "#{base_title} | #{page_title}"
    end
  end
  def qr_code_data_url(url)
    return RQRCode::QRCode.new(url, :size => 6, :level => :h).to_img.resize(700, 700).to_data_url
  end
end