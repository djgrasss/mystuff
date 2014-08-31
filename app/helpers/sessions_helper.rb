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
end
