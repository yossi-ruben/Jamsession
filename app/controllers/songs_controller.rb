class SongsController < ApplicationController
  GENERIC_SONG_IMAGES = ["https://jamsession-app.s3.amazonaws.com/Pearl1.jpg", "https://jamsession-app.s3.amazonaws.com/Pearl2.jpg", "https://jamsession-app.s3.amazonaws.com/Pearl3.jpg", "https://jamsession-app.s3.amazonaws.com/Pearl4.jpg", "https://jamsession-app.s3.amazonaws.com/Pearl5.jpg","https://jamsession-app.s3.amazonaws.com/Pearl6.jpg"]

  def finished_songs
    finished_songs = Song.where(finished: true)
    render json: finished_songs.as_json(include: [ :genres, :desired_talents, {master_tracks: {include: :likes}}, :user])
  end

  def unfinished_songs
    unfinished_songs = Song.where(finished: false)
    render json: unfinished_songs.as_json(include: [:desired_talents, :genres, {master_tracks: {include: :likes}}, :user])
  end

  def home_page
    if current_user
      user = User.find(current_user.id)
      @user_talents = user.talents
      @logged_in = true if user_signed_in?
      @user_genres = user.genres.map(&:name)
      @user_talents = user.talents.map(&:title)
    end
  end

  def show
    song = Song.find(params[:id])
    user = User.find(song.owner_id)
    @private_user_auth = false
    if current_user && song.owner_id == current_user.id
      @private_user_auth = true
    end
  end

  def info
    song = Song.find(params[:id])
    song_as_json(song)
  end

  def create
    # Create error array
    @errors = []

    # Create a new song
    @song = Song.new(title: params[:title], owner_id: params[:owner_id], bpm: params[:bpm], key: params[:key], time_signature: params[:time_signature], background: params[:background])
    @song.finished = false

    # Add genres to song
    genre_params = params.keys.select { |param| param =~ /genre/ }
    genre_ids = genre_params.map { |name| name.gsub(/genre/, "").to_i }
    genres_to_add = genre_ids.map { |id| Genre.find(id) }
    genres_to_add.each do |genre|
      @song.genres << genre
    end

    if @song.genres.length > 0
      song_has_genres = true
    else
      @errors << "Song must have at least one genre"
    end

    # Add talents to song
    talent_params = params.keys.select { |param| param =~ /talent/ }
    talent_ids = talent_params.map { |name| name.gsub(/talent/, "").to_i }
    talents_to_add = talent_ids.map { |id| Talent.find(id) }
    talents_to_add.each do |talent|
      @song.desired_talents << talent
    end

    if @song.desired_talents.length > 0
      song_has_talents = true
    else
      @errors << "Song must have at least one desired talent"
    end

    # Check for file
    if params[:file]
      song_has_file = true
    else
      @errors << "Song must have an initial master track"
    end

    if @song.save && song_has_talents && song_has_genres && song_has_file
      # Create initial master track
      s3 = AWS::S3.new(:access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY'])

      obj = s3.buckets[ENV['S3_BUCKET']].objects[params[:file].original_filename]

      obj.write(
        file: params[:file],
        acl: :public_read
      )

      master_track = @song.master_tracks.new(description: params[:description])

      master_track.file_name = obj.key
      master_track.file_path = obj.public_url

      master_track.save

      # Create song image or give a random picture
      if params[:img_file]  
        img = s3.buckets[ENV['S3_BUCKET']].objects[params[:img_file].original_filename]

        img.write(
          file: params[:img_file],
          acl: :public_read
        )

        @song.img_file_name = img.key
        @song.img_file_path = img.public_url
      else
        @song.img_file_name = "default"
        @song.img_file_path = GENERIC_SONG_IMAGES.sample
      end

      # Save song with file and image
      @song.save

      # Redirect user to new song page
      redirect_to "/songs/#{@song.id}"
    else
      @errors << @song.errors.full_messages
      @errors = @errors.flatten
      @description = params[:description]
      @current_user = current_user
      @genres = Genre.all.order(:name)
      @talents = Talent.all.order(:title)
      render 'songs/new'
    end
  end

  def update
    song = Song.find(params[:id])
    song.update(song_params)

    # Resets the song's genres according to user's new choices
    SongGenre.where(song_id: song.id).destroy_all
    params[:songGenres].each do |genre_id|
      song.genres << Genre.find(genre_id.to_i)
    end

    # Resets the song's desired talents according to user's new choices
    SongTalent.where(song_id: song.id).destroy_all
    params[:desiredTalents].each do |talent_id|
      song.desired_talents << Talent.find(talent_id.to_i)
    end

    song_as_json(song)
  end

  def destroy
    song = Song.find(params[:id])
    song.destroy
    redirect_to root_path, status: 303
  end

  def new
    @song = Song.new
    @genres = Genre.all.order(:name)
    @talents = Talent.all.order(:title)
    @current_user = current_user
  end

  def finish
    song = Song.find(params[:id])
    song.finished = true
    song.save
    song_as_json(song)
  end

  def reopen
    song = Song.find(params[:id])
    song.finished = false
    song.save
    song_as_json(song)
  end

  private
  def song_as_json(song)
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

  def song_params
    params.require(:song).permit(:title, :bpm, :key, :background, :time_signature)
  end
end

