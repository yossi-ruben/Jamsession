class SongsController < ApplicationController
  def finished_songs
    finished_songs = Song.where(finished: true)
    render json: finished_songs.as_json(include: [ :genres, :desired_talents, {master_tracks: {include: :likes}}])
  end

  def unfinished_songs
    # user = User.find(current_user.id)
    unfinished_songs = Song.where(finished: false)
    # @user_talents = user.talents
    # @logged_in = true if user_signed_in?
    # @user_genres = user.genres
    # respond_to do |format|
    #   format.html
    #   format.xml {
    render json: unfinished_songs.as_json(include: [:desired_talents, :genres, {master_tracks: {include: :likes}}])
      #     ])}
      # end
  end

  def home_page
  end

  def show
    song = Song.find(params[:id])
    user = User.find(song.owner_id)
    @private_user_auth = false
    if song.owner_id == current_user.id
      @private_user_auth = true
    end
  end

  def info
    song = Song.find(params[:id])
    render json: song.as_json(include:
      [{master_tracks: { include:
        [{feature_tracks: { include: [:user, :talent]}},
        {comments: { include: :user }},
        :likes,
        :fans]}},
      :user,
      :genres,
      :desired_talents,
      feature_tracks: { include: [:user, :talent]}])
  end
end

