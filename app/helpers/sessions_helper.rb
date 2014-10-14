module SessionsHelper
  def sign_in(user)
    mystuff_token = User.new_mystuff_token
    cookies.permanent[:mystuff_token] = mystuff_token

  # cookies.permanent[:mystuff_token] = {
  #   value: mystuff_token,
  #   expires: 20.years.from_now.utc
  # }
    user.update_attribute(:mystuff_token, User.digest(mystuff_token))
    self.current_user = user
  end

  def sign_out
    current_user.update_attribute(:mystuff_token, User.digest(User.new_mystuff_token))
    cookies.delete(:mystuff_token)
    if current_user.provider!=nil
      if current_user.provider == "facebook"
        redirect_to "https://www.facebook.com/logout.php?next=#{root_url}&access_token=#{current_user.oauth_token}"
      elsif current_user.provider == "twitter"
        redirect_to root_url
      end
    else
      redirect_to root_url
    end

    self.current_user = nil
  end

  def current_user=(user)
    @current_user = user
  end
  def current_user
    mystuff_token = User.digest(cookies[:mystuff_token])
    @current_user ||= User.find_by(mystuff_token: mystuff_token)
  end
  def current_user?(user)
    user == current_user
  end
  def signed_in?
    !current_user.nil?
  end

  def redirect_back_or(default)
    redirect_to(session[:return_to] || default)
    session.delete(:return_to)
  end

  def store_location
    session[:return_to] = request.url if request.get?
  end
  def signed_in_user
    unless signed_in?
      # if params[:client_type] == "plugin"
        render json:{
            status_code: 0,
            response:{
                signed_in: false
            }
        } and return
      # end
      # store_location
      # flash[:info] = "Please sign in."
      # redirect_to signin_url
    end
  end
end
