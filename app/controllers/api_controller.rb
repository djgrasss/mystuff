class ApiController < ApplicationController
  def get_html
    url = params[:url]
    doc = Nokogiri::HTML(open(url))
    title = doc.css('title')[0].text
    images = []
    doc.css('img').each do |image|
      images.push(image['src'])
    end

    # render :text => doc, :layout => false
    render json: {
        title: title,
        images: images
    }
  end
end
