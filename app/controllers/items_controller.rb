class ItemsController < ApplicationController
  def destroy
    Item.destroy(params[:id])
    render json: {
        response: "ok"
    }
  end
  def index
    # page = params[:page].to_i
    # (1..10).each do |i|
    #   p page
    # end
    # start = Item.offset(30*(page-1)).limit(1)[0].id
    # finish = Item.offset(30*page).limit(1)[0].id
    @items = Item.paginate(page: params[:page]).order("id DESC").as_json
    finish = @items[0]["id"]
    start = @items[-1]["id"]
    query_str = "item_id >= #{start} and item_id <= #{finish}"
    @images = Image.where(query_str).as_json
    @texts = Text.where(query_str).as_json

    @result = {}
    @items.each do |item|
      @result[item['id']] = item
    end
    @images.each do |image|
      item_id = image['item_id']
      @result[item_id] = @result[item_id].merge(image)
    end

    @texts.each do |text|
      item_id = text['item_id']
      @result[item_id] = @result[item_id].merge(text)
    end


    respond_to do |format|
      format.html{
      }
      format.json {
        render json:{
            :total => @items.size,
            :result => @result.values
            # :text => @texts.as_json,
            # :image => @images.as_json
        }
      }
    end
  end
end
