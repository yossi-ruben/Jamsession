class ConnectionsController < ApplicationController
  def create
    start_following = Connection.create(follower_id: params[:user_id], followed_id: params[:user_to_follow])
  end

  def destroy
  end

end