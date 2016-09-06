class SongsController < ApplicationController
  def finished_songs
    finished_songs = Song.where(finished: true)
    render json: finished_songs.as_json(include: [ :genres, :desired_talents, {master_tracks: {include: :likes}}, :user])
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
    render json: unfinished_songs.as_json(include: [:desired_talents, :genres, {master_tracks: {include: :likes}}, :user])
      #     ])}
      # end
  end

  def home_page
    if current_user
      user = User.find(current_user.id)
      @user_talents = user.talents
      @logged_in = true if user_signed_in?
      @user_genres = user.genres
    end
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

  def create
    # Create a new song
    song = Song.new(title: params[:title], owner_id: params[:owner_id], bpm: params[:bpm], key: params[:key], time_signature: params[:time_signature], background: params[:background])
    song.finished = false
    song.save

    # Add genres to song
    genre_params = params.keys.select { |param| param =~ /genre/ }
    genre_ids = genre_params.map { |name| name.gsub(/genre/, "").to_i }
    genres_to_add = genre_ids.map { |id| Genre.find(id) }
    genres_to_add.each do |genre|
      song.genres << genre
    end

    # Add talents to song
    talent_params = params.keys.select { |param| param =~ /talent/ }
    talent_ids = talent_params.map { |name| name.gsub(/talent/, "").to_i }
    talents_to_add = talent_ids.map { |id| Talent.find(id) }
    talents_to_add.each do |talent|
      song.desired_talents << talent
    end

    # Create initial master track
    s3 = AWS::S3.new(:access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY'])

    obj = s3.buckets[ENV['S3_BUCKET']].objects[params[:file].original_filename]

    obj.write(
      file: params[:file],
      acl: :public_read
    )

    master_track = song.master_tracks.new(description: params[:description])

    master_track.file_name = obj.key
    master_track.file_path = obj.public_url

    master_track.save

    # Redirect user to new song page
    redirect_to "/songs/#{song.id}"
  end

  def new
    @genres = Genre.all.order(:name)
    @talents = Talent.all.order(:title)
    @current_user = current_user
  end
end

