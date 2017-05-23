class CreateTmpContentImages < ActiveRecord::Migration[5.0]
  def change
    create_table :tmp_content_images do |t|
      t.string :image_url

      t.timestamps
    end
  end
end
