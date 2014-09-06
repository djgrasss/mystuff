class CreateTexts < ActiveRecord::Migration
  def change
    create_table :texts do |t|
      t.string :source_url
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
