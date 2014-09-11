class AddItemRefToTexts < ActiveRecord::Migration
  def change
    add_reference :texts, :item, index: true
  end
end
