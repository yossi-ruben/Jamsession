class CreateMasterTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :master_tracks do |t|
      t.integer :song_id
      t.string :description
      t.string :file_name
      t.string :file_path

      t.timestamps(null: false)
    end
  end
end
