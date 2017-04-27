class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email,            null: false
      t.string :password_digest,  null: false
      t.string :first_name,       null: false
      t.string :last_name,        null: false
      t.integer :age
      t.date :date_birthday
      t.string :country
      t.string :image_url,        default: '/assets/images/no-image-icon.jpg'
      t.boolean :activated
      t.datetime :activated_at
      t.datetime :last_seen
      t.string :api_key
      t.string :token
      t.string :role
      t.belongs_to :session, index: true

      t.timestamps
    end
  end
end
