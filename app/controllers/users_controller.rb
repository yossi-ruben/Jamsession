class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    songs_collaborated = Song.where()
    user_songs = Song.where(owner_id: current_user.id)
    find_liked_songs
    @liked_songs = @songs
    @private_user_unfinished_songs = user_songs.where(finished: false)
    @private_user_finished_songs = user_songs.where(finished: true)
    render json: user.as_json(include: [:talents, :comments, :followers, :following])
  end

  private
  def find_liked_songs
    likes = Like.where(user_id: current_user.id)
    @songs = []
    likes.each do |like|
      @songs << Song.find(like.song_id)
      return @songs
    end
  end
end
