class CreateSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :songs do |t|
      t.string :title
      t.integer :bpm
      t.string :key
      t.string :time_signature
      t.text :background
      t.boolean :finished
      t.integer :owner_id

      t.timestamps(null: false)
    end
  end
end
