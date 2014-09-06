class RemoveSourceUrlFromImages < ActiveRecord::Migration
  def change
    remove_column :images, :source_url, :string
  end
end
