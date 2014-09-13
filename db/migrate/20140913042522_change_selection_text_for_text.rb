class ChangeSelectionTextForText < ActiveRecord::Migration
  def change
    change_column :texts, :selection_text, :text
  end
end
