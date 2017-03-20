class NewsPageController < ApplicationController
  def index
    posts = Post.all
    respond_with posts
  end

  def create
    post = Post.create(post_params)
    respond_with(post, location: news_page_index_path)
  end

  private

  def post_params
    params.require(:news_page).permit(:title, :description)
  end
end
