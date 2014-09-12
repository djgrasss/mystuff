class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.timestamps
      t.actable
    end
  end
end
