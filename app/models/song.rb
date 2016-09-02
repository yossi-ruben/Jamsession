class Song < ApplicationRecord
  # Connects song to owner
  belongs_to :user, foreign_key: :owner_id

  # Connects song to master tracks and feature tracks included in them
  # The association between the song and its included feature tracks is done
  # individually through each master track.
  has_many :master_tracks

  # Connects song to submitted feature tracks
  has_many :feature_tracks

  # Connects song to genres
  has_many :song_genres
  has_many :genres, through: :song_genres

  # Connects song to desired talents
  has_many :song_talents
  has_many :talents, through: :song_talents
end
