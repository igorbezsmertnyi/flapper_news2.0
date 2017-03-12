class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :description
      t.string :author, default: 'user'
      t.integer :likes, default: 0

      t.timestamps
    end
  end
end
