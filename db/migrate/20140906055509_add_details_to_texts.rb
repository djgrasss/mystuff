class AddDetailsToTexts < ActiveRecord::Migration
  def change
    add_column :texts, :frame_url, :string
    add_column :texts, :page_url, :string
  end
end
