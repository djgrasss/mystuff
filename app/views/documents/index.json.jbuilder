json.array!(@documents) do |document|
  json.extract! document, :id, :title, :description, :url
  json.url document_url(document, format: :json)
end
