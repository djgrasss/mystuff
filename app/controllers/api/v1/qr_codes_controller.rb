require 'rqrcode_png'

class Api::V1::QrCodesController < ApplicationController
  def index
    render html:{
        qr_code_url: RQRCode::QRCode.new("http://codingricky.com").to_img.resize(200, 200).to_data_url
    }
  end
end
