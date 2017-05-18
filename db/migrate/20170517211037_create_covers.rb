class CreateCovers < ActiveRecord::Migration[5.0]
  def up
    add_attachment :covers, :image
  end

  def down
    remove_attachment :covers, :image
  end

  def change
    create_table :covers do |t|

      t.timestamps
    end
  end
end
