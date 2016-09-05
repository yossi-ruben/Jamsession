class TalentsController < ApplicationController


   def create_genres_talents
    current_user = User.find(params[:user_id])

    genre_params = params.keys.select { |param| param =~ /genre/ }
    genre_ids = genre_params.map { |name| name.gsub(/genre/, "").to_i }
    genres_to_add = genre_ids.map { |id| Genre.find(id) }
    genres_to_add.each do |genre|
      current_user.genres << genre
    end

    talent_params = params.keys.select { |param| param =~ /talent/ }
    talent_ids = talent_params.map { |name| name.gsub(/talent/, "").to_i }
    talents_to_add = talent_ids.map { |id| Talent.find(id) }
    talents_to_add.each do |talent|
      current_user.talents << talent
    end

    s3 = AWS::S3.new(:access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY'])

    obj = s3.buckets[ENV['S3_BUCKET']].objects[params[:file].original_filename]

    obj.write(
      file: params[:file],
      acl: :public_read
    )

      current_user.profile_pic_file_name = obj.key
      current_user.profile_pic_file_path = obj.public_url
      current_user.save

      redirect_to new_user_session_path
    end
end
