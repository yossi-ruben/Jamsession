class Song < ApplicationRecord
  # Connects song to owner
  belongs_to :user, foreign_key: :owner_id

  # Connects song to tracks
  has_many :master_tracks
  has_many :feature_tracks
end
