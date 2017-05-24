class AddAttachmentImageToCovers < ActiveRecord::Migration
  def self.up
    change_table :covers do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :covers, :image
  end
end
