class AddAttachmentImageToPostContentImages < ActiveRecord::Migration
  def self.up
    change_table :post_content_images do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :post_content_images, :image
  end
end
