class CreateSessions < ActiveRecord::Migration[5.0]
  def change
    create_table :sessions do |t|
      t.string :token
      t.belongs_to :user, index: true

      t.timestamps
    end

    add_index :sessions, :token
  end
end
