json.array!(@events) do |event|
  json.extract! event, :id, :title, :datetime, :description
  json.url event_url(event, format: :json)
end
