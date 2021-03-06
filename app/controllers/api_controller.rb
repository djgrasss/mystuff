require 'chronic'
class ApiController < ApplicationController
  protect_from_forgery :except => [:extract_time]
  def get_html
    url = params[:url]
    doc = Nokogiri::HTML(open(url))
    title = doc.css('title')[0].tex
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
  def extract_time
    p params
    text = params[:text]
    extracted_time = Chronic.parse(text)
    if extracted_time.nil?
      extracted_time = Time.now
    end
    render json: {
        response: {
            datetime: extracted_time.strftime("%Y-%m-%d %H:%M")

        }
    }
  end
end
