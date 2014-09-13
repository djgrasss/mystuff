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
  def mystuff
  end
  def check_signin
    render json: {
        response:{
            signed_in: signed_in?
        }
    }
  end
  def notifications_count
    if signed_in?
      render json: {
          response: {
              signed_in: true,
              username: current_user['name']
          }
      }
    else
      render json: {
          response: {
              signed_in: false,
          }
      }
    end
  end
end