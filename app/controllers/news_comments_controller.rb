class NewsCommentsController < ApplicationController

  def index
    respond_with Post.find(params[:news_page_id]).comments
  end

  def create
    post = Post.find(params[:news_page_id])
    comment = post.comments.create(comment_params)
    respond_with(comment, location: news_page_news_comments_path)
  end

  private

  def comment_params
    params.require(:news_comment).permit(:body)
  end
end
