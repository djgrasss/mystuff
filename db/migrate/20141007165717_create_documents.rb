class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.string :title
      t.string :description
      t.string :url

      t.timestamps
    end
  end
end
