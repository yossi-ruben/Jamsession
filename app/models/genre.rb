class Genre < ApplicationRecord
  # Connects the genres to users
  has_many :user_genres
  has_many :users, through: :user_genres

  # Connects the genres to songs
  has_many :song_genres
  has_many :songs, through: :song_genres
end
