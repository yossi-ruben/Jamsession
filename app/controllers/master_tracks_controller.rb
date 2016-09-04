class MasterTracksController < ApplicationController
  def create
    s3 = AWS::S3.new(:access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY'])

    obj = s3.buckets[ENV['S3_BUCKET']].objects[params[:master_track][:file].original_filename]

    obj.write(
      file: params[:master_track][:file],
      acl: :public_read
    )

    song = Song.find_by(id: params[:master_track][:song_id])

    master_track = song.master_tracks.new(master_track_params)

    master_track.file_name = obj.key
    master_track.file_path = obj.public_url

    master_track.save

    params[:includedFeatures].split(",").each do |feature_id|
      MasterFeature.create(master_track_id: master_track.id, feature_track_id: feature_id.to_i)
    end
  end

  private
  def master_track_params
    params.require(:master_track).permit(:song_id, :description)
  end
end
