class CreateCovers < ActiveRecord::Migration[5.0]
  def change
    create_table :covers do |t|
      t.string :color
      t.string :opacity
      t.string :blur
      t.string :gray
      t.string :image_url

      t.timestamps
    end
  end
end
