module Api::V1
  class EventsController < ApiController

    # POST /v1/events
    def create
      render json: params.to_json
    end
    def index
      render json: {
          fuck: "bitch"
      }
    end
    def haha
      render json: {
          fuck: "bitch"
      }
    end

  end
end
