class NewsPageController < ApplicationController
  def index
    posts = Post.all
    respond_with posts
  end

  def create
    respond_with Post.create(post_params)
  end

  private

  def post_params
    params.require(:post).permit(:title, :description)
  end
end
