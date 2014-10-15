class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :add_xframe
  include SessionsHelper

  def add_xframe
    #headers['X-Frame-Options'] = 'GOFORIT'
    #headers['Access-Control-Allow-Origin'] = '*'
    #headers['Access-Control-Request-Method'] = '*'
  end

end
