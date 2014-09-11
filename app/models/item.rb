class Item < ActiveRecord::Base
  actable
  after_save  do |item|
    table = item.actable_type
    item_id = item.id
    id = item.actable_id
    p "#{table} #{item_id}, #{id}"
    table.singularize.classify.constantize.update(
        id, item_id: item_id
    )
  end
end
