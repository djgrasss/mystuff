class AddSelectionTextToTexts < ActiveRecord::Migration
  def change
    add_column :texts, :selection_text, :string
  end
end
