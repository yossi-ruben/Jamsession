class CreateFeatureTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :feature_tracks do |t|
      t.string :description
      t.integer :talent_id
      t.integer :user_id
      t.string :file_name
      t.string :file_path

      t.timestamps(null: false)
    end
  end
end
