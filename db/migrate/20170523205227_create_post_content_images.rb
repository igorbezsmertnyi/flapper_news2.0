class CreatePostContentImages < ActiveRecord::Migration[5.0]
  def change
    create_table :post_content_images do |t|

      t.timestamps
    end
  end
end
