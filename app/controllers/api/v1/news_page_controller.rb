class Api::V1::NewsPageController < ApplicationController

  def index
    render json: Post.all
  end

  def show
    render json: Post.find_by(post_url: params[:id])
  end

  def create
    @post = Post.create(post_params.merge(user: current_user))
    @post.create_cover(cover_data(cover_params))

    save_sover_image(cover_params[:image])
    generate_post_url(post_params[:title])

    if @post.save
      render json: @post
    else
      render body: @post.errors.full_messages, status: :internal_server_error
    end
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params)

    if @post.save
      render json: @post
    else
      render status: :internal_server_error
    end
  end

  def upvote
    @post = Post.find(params[:id])

    unless upvoted_by?

      if disupvoted_by?
        vote = disupvoted_by?
        vote.destroy
      end

      @post.upvotes.new(user_id: current_user.id)

      if @post.save
        render json: @post
      else
        render body: @post.errors.full_messages, status: :internal_server_error
      end
    else
      vote = upvoted_by?
      if vote.destroy
        render json: @post
      else
        renderer body: @post.errors.full_messages, status: :internal_server_error
      end
    end
  end

  def disupvote
    @post = Post.find(params[:id])

    unless disupvoted_by?

      if upvoted_by?
        vote = upvoted_by?
        vote.destroy
      end

      @post.disupvotes.new(user_id: current_user.id)

      if @post.save
        render json: @post
      else
        render body: @post.errors.full_messages, status: :internal_server_error
      end
    else
      vote = disupvoted_by?
      if vote.destroy
        render json: @post
      else
        renderer body: @post.errors.full_messages, status: :internal_server_error
      end
    end
  end

  def destroy
    post = Post.find(params[:id])

    if post.destroy
      render json: params[:id]
    else
      render body: post.errors.full_messages, status: :internal_server_error
    end
  end

  private

  def post_params
    params.require(:news_page).permit(:title, :subtitle, :categories, :content)
  end

  def cover_params
    params.require(:news_page).permit([:cover => [:color, :opacity, :blur, :gray]],
                                      [:image => [:source, [:file => [:name, :size, :type]]]])
  end

  def upvoted_by?
    Post.find(params[:id]).upvotes.find_by_user_id(current_user.id)
  end

  def disupvoted_by?
    Post.find(params[:id]).disupvotes.find_by_user_id(current_user.id)
  end
end
