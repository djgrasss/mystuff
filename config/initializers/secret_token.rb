# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
require 'securerandom'

def secure_token
  token_file = Rails.root.join('.secret')
  if File.exist?(token_file)
    # Use the existing token.
    File.read(token_file).chomp
  else
    # Generate a new token and store it in token_file.
    token = SecureRandom.hex(64)
    File.write(token_file, token)
    token
  end
end

Engex::Application.config.secret_key_base = secure_token
#Engex::Application.config.secret_key_base = '7e62a2535ae0e19953e83f2c1ee45606aac69d78d6cdcc9396ab90f37671fc6a577cdf4c4ab68c45f2ae8d77800c96801d4531f1871466557fc114c76417885a'
