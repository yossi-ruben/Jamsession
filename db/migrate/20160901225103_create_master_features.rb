class CreateMasterFeatures < ActiveRecord::Migration[5.0]
  def change
    create_table :master_features do |t|
      t.integer :master_track_id
      t.integer :feature_track_id

      t.timestamps
    end
  end
end
