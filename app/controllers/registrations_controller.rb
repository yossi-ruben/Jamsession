class RegistrationsController < Devise::RegistrationsController

  def resource_name
    :user
  end

  def new
    @user = User.new
    render '/users/registrations/new'
  end



  def new_genres_talents
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

    if @talents.save && @genres.save
      redirect_to new_user_session
    else
      render :new_genres_talents
    end
  end

  def create
    @user = User.new(sign_up_params)
    if @user.save
      redirect_to registrations_new_genres_talents
    else
      @errors = @user.errors.full_messages
      render :new
    end
  end


  private
  def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :genres, :talents)
  end


end
