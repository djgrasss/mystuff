OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '351033021726357', '1ba49f611ab0c8718207dcacfce0c353'
  {
      display: 'popup',
      #secure_image_url: 'true',
      #image_size: 'square',
      client_options: {
          ssl: {
              ca_file: Rails.root.join('lib', 'assets', 'cacert.pem').to_s
          }
      }
  }
end