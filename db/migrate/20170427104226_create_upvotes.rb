class CreateUpvotes < ActiveRecord::Migration[5.0]
  def change
    create_table :upvotes do |t|
      t.string :value
      t.references :post, foreign_key: true
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
