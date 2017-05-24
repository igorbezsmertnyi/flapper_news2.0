class Api::V1::PostContentImageController < ApplicationController

  def image_upload
    @image = PostContentImage.new()
    @image.image = params[:file]

    if @image.save
      render json: { link: @image.image.url, id: @image.id}
    else
      render body: @image.errors.full_messages, status: :internal_server_error
    end
  end

  def image_remove
    @image = PostContentImage.find_by_id(params[:id])
    @image.destroy
  end
end
