class LikesController < ApplicationController
  def create
    Like.create(like_params)
  end

  private
  def like_params
    params.require(:like).permit(:master_track_id, :user_id)
  end
end
