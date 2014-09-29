class AddBeginAndEndDatetimesToEvents < ActiveRecord::Migration
  def change
    add_column :events, :begin_datetime, :datetime
    add_column :events, :end_datetime, :datetime
  end
end
