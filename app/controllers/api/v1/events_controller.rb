module Api::V1
  class EventsController < ApiController

    # POST /v1/events
    def create
      render json: params.to_json
    end
    def index
      render json: Event.find(1).to_json();
    end
  end
end
