class RemoveSourceUrlToTexts < ActiveRecord::Migration
  def change
    remove_column :texts, :source_url, :string
  end
end
