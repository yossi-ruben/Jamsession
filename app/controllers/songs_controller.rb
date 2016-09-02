class SongsController < ApplicationController
  def finished_songs
    finished_songs = Song.where(finished: true)
    render json: finished_songs.as_json(include: [:likes, :genres, :desired_talents])
  end

  def unfinished_songs
    user = User.find(current_user.id)
    unfinished_songs = Song.where(finished: false)
    @user_talents = user.talents
    @logged_in = true if user_signed_in?
    @user_genres = user.genres
    respond_to do |format|
      format.html {songsindex.html.erb}
      format.xml {render json: unfinished_songs.as_json(include: [:desired_talents, :genres, :likes])}
      end
  end

  def show
    song = Song.find(params[:id])
    @private_user_auth = false
    user = User.find(song.owner_id)
    if song.owner_id = current_user.id
      @private_user_auth = true
    end
    @followers_number = user.followers.count
    render json: song.as_json(include:
      [{master_tracks: { include: [:feature_tracks, :comments, :likes]}}, :user, :genres, :desired_talents, :feature_tracks])
  end
end

