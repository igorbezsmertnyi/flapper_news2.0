module PostHelper
  def cover_data(cover_params)
    cover = cover_params[:cover]
    { blur: cover[:blur],
      opacity: cover[:opacity],
      color: cover[:color],
      gray: cover[:gray] }
  end

  def save_sover_image(image_file)
    if image_file
      image = Paperclip.io_adapters.for(image_file[:source])
      image.original_filename = image_file[:file][:name]
      image.content_type = image_file[:file][:type]
      @post.cover.image = image
      @post.cover.image_url = @post.cover.image.url
      @post.cover.image.save
      @post.cover.save
    end
  end
end
