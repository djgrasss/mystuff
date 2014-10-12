class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :signed_in_user, only: [:edit, :update, :index]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy


  def index
    @users = User.paginate(page: params[:page])
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        sign_in @user
        format.html{
          flash[:success] = "Welcome to Engex!"
          redirect_to @user
        }
        format.json{
          render json:{
              status_code: 0,
          }
        }
      else
        format.html{
          render 'new'
        }
        format.json{
          render json:{
              status_code: 1,
              renponse: @user.errors
          }
        }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:notice] = "Profile updated"
      redirect_to @user
    else
      flash[:danger] = "Profile not updated"
      render 'edit'
    end

   # respond_to do |format|
   #   if @user.update(user_params)
   #     format.html { redirect_to @user, notice: 'User was successfully updated.' }
   #     format.json { head :no_content }
   #   else
   #     format.html { render action: 'edit' }
   #     format.json { render json: @user.errors, status: :unprocessable_entity }
   #   end
   # end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html { 
        flash[:success] = "User deleted."
        redirect_to users_url 
      }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:firstname, :lastname, :email, :password, :password_confirmation)
    end
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end
