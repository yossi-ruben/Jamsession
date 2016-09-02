class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user.as_json(include: [:talents, :comments], only: :username)
  end
end
