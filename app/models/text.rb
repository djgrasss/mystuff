class Text < ActiveRecord::Base
  acts_as :item
  # has_many :items, :as => :itemable, :dependent => {:destroy, :create}
end
