require 'spec_helper'

describe StaticPagesController do

  describe "GET 'my_stuff'" do
    it "returns http success" do
      get 'my_stuff'
      response.should be_success
    end
  end

end
