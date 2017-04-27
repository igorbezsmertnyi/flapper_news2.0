class Api::V1::NewsPageController < ApplicationController
  def index
    posts = Post.all
    render json: posts
  end

  def show
    render json: Post.find(params[:id])
  end

  def create
    @post = Post.create(post_params.merge(user: current_user))

    if @post.save
      render json: @post
    else
      render status: :internal_server_error
    end
  end

  def update
    post = Post.find(params[:id])
    post.update(post_params)
  end

  def upvote
    @post = Post.find(params[:id])

    unless @post.upvotes.find_by_user_id(current_user.id)
      @post.upvotes.new(user_id: current_user.id)

      if @post.save
        render json: @post
      end
    else
      render body: 'already upvoted by current user', status: :not_acceptable
    end
  end

  def disupvote
    @post = Post.find(params[:id])
    if @post.upvotes.destroy(current_user)
      render json: @post
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.comments.delete_all
    if post.delete
      render json: params[:id]
    else
      render status: :internal_server_error
    end
  end

  private

  def post_params
    params.require(:news_page).permit(:title, :content)
  end
end
