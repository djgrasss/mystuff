class SessionsController < ApplicationController
  def new
    render layout: false
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    respond_to do |format|
      if user && user.authenticate(params[:session][:password])
        sign_in user
        format.html{
          redirect_back_or user
        }
        format.json{
          render json:{
              status_code: 0
          }
        }
      else
        format.html{
          flash.now[:danger] = 'Invalid email/password combination'
          render 'new'
        }
        format.json{
          render json:{
              status_code: 1,
              response: user.errors
          }
        }
      end
    end
  end

  def destroy
    sign_out
  end




end