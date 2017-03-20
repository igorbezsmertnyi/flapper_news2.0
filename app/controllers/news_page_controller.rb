class NewsPageController < ApplicationController
  def index
    posts = Post.all
    respond_with posts
  end

  def create
    post = Post.create(post_params)
    respond_with(post, location: news_page_index_path)
  end

  def update
    post = Post.update(params[:id])
    respond_with post
  end

  def destroy
    post = Post.find(params[:id]).delete
    respond_with params[:id]
  end

  private

  def post_params
    params.require(:news_page).permit(:title, :description)
  end
end
