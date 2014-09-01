class ChangeUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.remove :remember_token
      t.string :mystuff_token
    end
  end
end
