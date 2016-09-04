class CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    comment.save
    render json: comment.as_json(include: :user)
  end

  private
  def comment_params
    params.require(:comment).permit(:user_id, :master_track_id, :body)
  end
end
