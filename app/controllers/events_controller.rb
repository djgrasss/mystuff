class EventsController < ApplicationController
  before_action :signed_in_user, only: [:edit, :update, :index, :create]
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  protect_from_forgery :except => [:create]

  # GET /events
  # GET /events.json
  def index
    @events = Event.all;
    @events_ajax=Event.select("id, title, description, begin_datetime as start, end_datetime as end");
    respond_to do |format|
      format.html{
      }
      format.json {
        ret = @events_ajax.as_json
        render json: ret
      }
    end
  end

  # GET /events/1
  # GET /events/1.json
  def show
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events
  # POST /events.json
  def create
    respond_to do |format|
      @event = Event.new(event_params)
      format.html {
        if @event.save
          redirect_to @event, notice: 'Event was successfully created.'
        else
          render action: 'new'
        end
      }
      format.json {
        @event = Event.new(event_params)
        if @event.save
          render json: {
              status_code:  0,
              response:{
                  created_url: (url_for @event)
              }
          }
        else
          render json: {
              status_code: 1,
              errors: @event.errors,
          }
        end
      }
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render json:{status_code: 0}  }
      else
        format.html { render action: 'edit' }
        format.json { render json: {
            message: @event.errors,
            status_code: 1
          }
        }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    destroyed = @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url }
      format.json {
        if destroyed
          render json:{
              status_code: 0
          }
        else
          render json:{
              status_code: 1,
              message: @event.errors
          }
        end
      }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(:title, :datetime, :description, :begin_datetime, :end_datetime)
    end
end
