class Api::V1::NewsCommentsController < ApplicationController
  def index
    render json: Post.find(params[:news_page_id]).comments
  end

  def create
    post = Post.find(params[:news_page_id])
    @comment = post.comments.create(comment_params.merge(user: current_user))

    if @comment.save
      render json: @comment
    end
  end

  def destroy
    post = Post.find(params[:news_page_id])
    @comment = post.comments.find(params[:id]).destroy

    if @comment.destroy
      render json: params[:id]
    end
  end

  private

  def comment_params
    params.require(:news_comment).permit(:body)
  end
end
