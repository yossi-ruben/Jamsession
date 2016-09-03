class FeatureTracksController < ApplicationController
  def create
    s3 = AWS::S3.new(:access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY'])

    print "Here are the params: " + params.to_s

    obj = s3.buckets[ENV['S3_BUCKET']].objects[params[:file].original_filename]

    obj.write(
      file: params[:file],
      acl: :public_read
    )

    song = Song.find_by(id: params[:song_id])

    feature_track = song.feature_tracks.new(feature_track_params)

    feature_track.file_name = obj.key
    feature_track.file_path = obj.public_url

    feature_track.save
  end

  private
  def feature_track_params
    params.require(:feature_track).permit(:file, :talent_id, :user_id, :file_name, :file_path, :description)
  end
end
