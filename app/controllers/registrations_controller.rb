class RegistrationsController < Devise::RegistrationsController

  def resource_name
    :user
  end

  def new
    @user = User.new
    render '/users/registrations/new'
  end



  def create
    @user = User.new(sign_up_params)
    if @user.save
      @genres = Genre.all
      @talents = Talent.all
      render '/users/registrations/new_talents'
    else
      @errors = @user.errors.full_messages
      render :new
    end
  end


  private
  def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end


end
