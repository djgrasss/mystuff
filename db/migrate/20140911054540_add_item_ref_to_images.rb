class AddItemRefToImages < ActiveRecord::Migration
  def change
    add_reference :images, :item, index: true
  end
end
