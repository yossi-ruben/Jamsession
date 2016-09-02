class Talent < ApplicationRecord
  # Connects talents to songs desiring those talents
  has_many :song_talents
  has_many :songs, through: :song_talents

  # Connects talents to users with those talents 
  has_many :user_talents
  has_many :users, through: :user_talents

  has_many :feature_tracks
end
