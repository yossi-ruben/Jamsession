class AddSongIdColumnToFeature < ActiveRecord::Migration[5.0]
  def change
    add_column(:feature_tracks, :song_id, :integer)
  end
end
