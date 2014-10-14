OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do

  provider :facebook, '351033021726357', '1ba49f611ab0c8718207dcacfce0c353',
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

  provider :twitter, 'kBRoXo0lKJHkOPpANJSTxFoyf', 'qFnpNEYdvvMmYMnxr1Lv0AS7AomgYByjMeO3YP7yahWm2HXwm1',
  {
      #secure_image_url: 'true',
      #image_size: 'normal',
      authorize_params: {
          force_login: 'false',
          lang: 'pt'
      }
  }
end