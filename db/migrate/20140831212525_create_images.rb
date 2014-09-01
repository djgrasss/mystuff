class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :user_id
      t.string  :image_url
      t.string  :source_url
      t.string  :title
      t.text    :description
      t.timestamps
    end
  end
end
