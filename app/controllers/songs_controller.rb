class SongsController < ApplicationController
  def index
    user = User.find(current_user.id)
    unfinished_songs = Song.where(finished: false)
    finished_songs = Song.where(finished: true)
    render json: user.as_json(include: [:genres, :talents ])
    render json: unfinished_songs.as_json(include: [ :genres,:likes, :talents])
    render json: finished_songs.as_json(include: [:likes])
  end

  def show
    song = Song.find(params[:id])
    @private_user_auth = false
    user = User.find(song.owner_id)
    if song.owner_id = current_user.id
      @private_user_auth = true
    end
    # @likes = song.likes.count
    @followers_number = user.followers.count
    render json: song.as_json(include:
      [{master_tracks: { include: [:feature_tracks, :comments]}}, :user, :genres, :desired_talents, :feature_tracks])
  end
end
