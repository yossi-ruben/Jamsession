class SongsController < ApplicationController
  def index
    user = User.find(current_user.id)
    unfinished_songs = Song.where(finished: false)
    finished_songs = Song.where(finished: true)
    render json: user.as_json(include: [:genres, :talents ])
    render json: unfinished_songs.as_json(include: [ :genres,:likes, :talents])
    render json: finished_songs.as_json(include: [:likes])
  end
end
