class ImagesController < ApplicationController
  before_action :signed_in_user, only: [:edit, :update, :index, :create]
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
            status_code:  0,
            response:{
              image_url: image_url
            }
          }
        }
      else
        format.html{ render 'new'  }
        format.json {
          render json: {
            status_code:  1,
            errors: @image.errors
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
        if ret.count==0
          render json:{}
        else
          render json:{
              :total => ret.count,
              :result => ret
          }
        end
      }
    end
  end

  def new
    @s3_direct_post = S3_BUCKET.presigned_post(
        key: "uploads/#{SecureRandom.uuid}/${filename}",
        success_action_status: 201,
        acl: :public_read
    )
    @image = Image.new
  end
  private
    def image_params
      params.require(:image).permit(:image_url, :title, :description)
    end
end
