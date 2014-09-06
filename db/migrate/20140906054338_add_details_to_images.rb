class AddDetailsToImages < ActiveRecord::Migration
  def change
    add_column :images, :frame_url, :string
    add_column :images, :page_url, :string
  end
end
