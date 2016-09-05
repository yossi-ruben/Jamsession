class LikesController < ApplicationController
  def create
    Like.create(like_params)
  end

  def destroy
    like = Like.find_by(user_id: params[:user_id], master_track_id: params[:master_track_id])
    like.destroy
  end

  private
  def like_params
    params.require(:like).permit(:master_track_id, :user_id)
  end
end
