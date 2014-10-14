class User < ActiveRecord::Base
  #before_save {self.email = email.downcase}
  before_save { email.downcase! }
  before_create :create_member_token
  validates :firstname, presence: true, length: {maximum: 50}
  validates :lastname, presence: true, length: {maximum: 50}
  #VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(?:\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, format:{with: VALID_EMAIL_REGEX}, uniqueness:{case_sensitive: false}
  has_secure_password
  validates :password, length: { minimum: 6 }

  def self.omniauth(auth)
    if auth.provider == "facebook"
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.oauth_token = auth.credentials.token
        user.oauth_expires_at = Time.at(auth.credentials.expires_at)
        user.firstname = auth.info.first_name
        user.lastname = auth.info.last_name
        user.email = auth.info.email
        user.password=user.email
        user.mystuff_token = User.digest(User.new_mystuff_token)


        user.save!
      end
    elsif auth.provider == "twitter"
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.oauth_token = auth.credentials.token
        #user.oauth_expires_at = Time.at(auth.credentials.expires_at)
        user.firstname = auth.info.nickname
        user.lastname = auth.info.name
        user.email = auth.info.nickname+"-twitter@twitter.com"
        user.password=user.email
        user.mystuff_token = User.digest(User.new_mystuff_token)


        user.save!
      end
    end

  end

  def User.get_index
  end

  def User.new_mystuff_token
    SecureRandom.urlsafe_base64
  end

  def User.digest(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  private
    def create_member_token
      self.mystuff_token = User.digest(User.new_mystuff_token)
    end
end
