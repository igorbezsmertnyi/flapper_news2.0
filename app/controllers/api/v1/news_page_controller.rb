class Api::V1::NewsPageController < ApplicationController

  def index
    posts = Post.all
    render json: posts
  end

  def show
    render json: Post.find(params[:id])
  end

  def create
    post = Post.create(post_params)

    if post.save
      render json: post
    end
  end

  def update
    post = Post.find(params[:id])
    post.update(post_params)
  end

  def destroy
    post = Post.find(params[:id]).delete
    render json: params[:id]
  end

  private

  def post_params
    params.require(:news_page).permit(:title, :description)
  end
end
