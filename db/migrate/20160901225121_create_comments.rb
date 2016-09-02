class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :master_track_id
      t.text :body

      t.timestamps(null: false)
    end
  end
end
