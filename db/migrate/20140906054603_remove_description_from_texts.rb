class RemoveDescriptionFromTexts < ActiveRecord::Migration
  def change
    remove_column :texts, :description, :string
  end
end
