class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :subtitle
      t.string :categories
      t.text :content
      t.string :post_url

      t.timestamps
    end
  end
end
