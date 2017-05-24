class AddPostRefToCovers < ActiveRecord::Migration[5.0]
  def change
    add_reference :covers, :post, foreign_key: true
  end
end
