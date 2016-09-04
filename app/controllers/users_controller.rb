class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    user_songs = Song.where(owner_id: user.id)
    @liked_masters = find_liked_songs(user)
    @collaborated_songs = find_collaborated_songs(user)
    @user_unfinished_songs = user_songs.where(finished: false)
    @user_finished_songs = user_songs.where(finished: true)
    
  end

  def info
    user = User.find(params[:id])
    render json: user.as_json(include: [:talents, :followers, :following, :genres])
  end

  private
  def find_liked_songs(user)
    likes = Like.where(user_id: user.id)
    @liked_masters = []
    likes.each do |like|
      # each master track in array
      master_track = MasterTrack.find(like.master_track_id)
      @liked_masters << {master: (master_track), song: master_track.song, user: master_track.song.user}
    end
    return @liked_masters
  end

  def find_collaborated_songs(user)
    features_contributed = FeatureTrack.where(user_id: user.id)
    masters_contributed_to = []
    features_contributed.each do |feature|
      # binding.pry
      if feature.master_tracks.length > 0
        masters_contributed_to << feature.master_tracks[feature.master_tracks.length - 1]
      end
    end
    @collaborated_songs = []
    masters_contributed_to.each do |master|
      @collaborated_songs << {song: master.song, master: master, user: master.song.user}
    end
    return @collaborated_songs
  end
end
