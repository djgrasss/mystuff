class TextsController < ApplicationController
  before_action :set_text, only: [:new]
  def show
    @text = Text.find(params[:id])
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
              :status_code => 1,
              :source_url => text_url
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
  private
  def text_params
    params.require(:text).permit(:source_url, :title, :description)
  end
  def set_text
    @text = Text.new
  end
end
