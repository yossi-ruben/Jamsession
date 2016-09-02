class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    user_songs = Song.where(owner_id: current_user.id)
    find_liked_songs
    find_collaborated_songs
    @user_unfinished_songs = user_songs.where(finished: false)
    @user_finished_songs = user_songs.where(finished: true)
    render json: user.as_json(include: [:talents, :followers, :following, :genres])
  end

  private
  def find_liked_songs
    likes = Like.where(user_id: current_user.id)
    @liked_songs = []
    likes.each do |like|
      @songs << Song.find(like.song_id)
      return @liked_songs
    end
  end

  def find_collaborated_songs
    features_contributed = FeatureTrack.where(user_id: current_user.id)
    masters_contributed_to = MasterTrack.features_contributed
    @collabored_songs = Song.masters_contributed_to
    return @collabored_songs
  end
end
