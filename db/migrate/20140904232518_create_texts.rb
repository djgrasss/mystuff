class CreateTexts < ActiveRecord::Migration
  def change
    create_table :texts do |t|
      t.string :title
      t.string :description
      t.string :source_url

      t.timestamps
    end
  end
end
