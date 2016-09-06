class ConnectionsController < ApplicationController
  def create
    start_following = Connection.create(follower_id: params[:user_id], followed_id: params[:user_to_follow])
    render json: User.find(params[:user_id])
  end

  def destroy
    connect = Connection.find_by(follower_id: params[:user_id], followed_id: params[:user_to_follow])
    connect.destroy
    render json: User.find(params[:user_id])
  end

end