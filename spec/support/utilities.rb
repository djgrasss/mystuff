def full_title(page_title)
  base_title = "Engex"
  if page_title.empty?
    base_title
  else
    "#{base_title} | #{page_title}"
  end
end

def sign_in(user, options={})
  if options[:no_capybara]
    # Sign in when not using Capybara.
    stuff_token = User.new_stuff_token
    cookies[:stuff_token] = stuff_token
    user.update_attribute(:stuff_token, User.digest(stuff_token))
  else
    visit signin_path
    fill_in "Email",    with: user.email
    fill_in "Password", with: user.password
    click_button "Sign in"
  end
end
