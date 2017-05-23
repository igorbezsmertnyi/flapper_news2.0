class AddAttachmentImageToTmpContentImages < ActiveRecord::Migration
  def self.up
    change_table :tmp_content_images do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :tmp_content_images, :image
  end
end
