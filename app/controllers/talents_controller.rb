class TalentsController < ApplicationController
  def new_genres_talents
    @user = User.last
    @genres = Genre.all
    @talents = Talent.all
    render '/users/registrations/new_talents'
  end

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

      redirect_to new_user_session_path
    end
end
