class  Api::V1::NewsCommentsController < ApplicationController
  include ActionController::Serialization

  def index
    render json: Post.find(params[:news_page_id]).comments
  end

  def create
    post = Post.find(params[:news_page_id])
    comment = post.comments.create(comment_params)
    render json: comment
  end

  private

  def comment_params
    params.require(:news_comment).permit(:body)
  end
end
