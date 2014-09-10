class AddIndexToUsers < ActiveRecord::Migration
  def change
    add_column :users, :index, :string
  end
end
