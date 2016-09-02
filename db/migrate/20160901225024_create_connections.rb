class CreateConnections < ActiveRecord::Migration[5.0]
  def change
    create_table :connections do |t|
      t.integer :follower_id
      t.integer :followed_id

      t.timestamps(null: false)
    end
  end
end
