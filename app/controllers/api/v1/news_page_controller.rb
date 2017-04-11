class Api::V1::NewsPageController < ApplicationController
  include ActionController::Serialization

  def index
    @posts = Post.all
    render json: @posts
  end

  def show
    respond_with Post.find(params[:id])
  end

  def create
    post = Post.create(post_params)

    if post.save
      respond_with(post, location: news_page_index_path)
    end
  end

  def update
    post = Post.find(params[:id])
    post.update(post_params)
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
