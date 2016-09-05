class TalentsController < ApplicationController
  def new_genres_talents
    @user = User.last
    @genres = Genre.all
    @talents = Talent.all
    render '/users/registrations/new_talents'
  end
end
