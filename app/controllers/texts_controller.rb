class TextsController < ApplicationController
  before_action :signed_in_user, only: [:edit, :update, :index, :create]
  protect_from_forgery :except => [:create]
  before_action :set_text, only: [:new]
  def show
    @text = Text.find(params[:id])
  end
  def index
    @texts = Text.paginate(page: params[:page]).order("texts.id DESC")
    respond_to do |format|
      format.html{
      }
      format.json {
        ret = @texts.as_json
        render json:{
            :total => ret.count,
            :result => ret
        }
      }
    end
  end
  def new
  end
  def create
    @text = Text.new(text_params)
    respond_to do |format|
      if @text.save
        format.html{
          flash[:success] = "Text has saved successfully!"
          redirect_to @text
        }
        format.json {
          text_url = url_for @text
          render json: {
              :status_code => 0,
              :source_url => text_url
          }
        }
      else
        format.html{ render 'new'  }
        format.json {
          render json: {
              :status_code => 1
          }
        }
      end
    end
  end
  private
  def text_params
    params.require(:text).permit(:page_url, :frame_url, :selection_text)
  end
  def set_text
    @text = Text.new
  end
end
