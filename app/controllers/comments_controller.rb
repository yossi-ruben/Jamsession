class CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment.as_json(include: :user)
    else
      render json: {errors: comment.errors.full_messages}, status: 400
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    render json: comment
  end

  private
  def comment_params
    params.require(:comment).permit(:user_id, :master_track_id, :body)
  end
end
