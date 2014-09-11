class ImagesController < ApplicationController
  protect_from_forgery :except => [:create]

  def create
    @image = Image.new(image_params)
    respond_to do |format|
      if @image.save
        format.html{
          flash[:success] = "Image has saved successfully!"
          redirect_to @image
        }
        format.json {
          image_url = url_for @image
          render json: {
            :status_code => 1,
            :image_url => image_url
          }
        }
      else
        format.html{ render 'new'  }
        format.json {
          render json: {
            :status_code => 2
          }
        }
      end
    end
  end


  def show
    @image = Image.find(params[:id])
  end

  def index
    @images = Image.paginate(page: params[:page]).order("images.id DESC")
    respond_to do |format|
      format.html{
      }
      format.json {
        ret = @images.as_json
        render json:{
          :total => ret.count,
          :result => ret
        }
      }
    end
  end

  def new
    @image = Image.new
  end
  private
    def image_params
      params.require(:image).permit(:image_url, :title, :description)
    end
end
