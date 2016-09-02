class UserGenre < ApplicationRecord
  # Allows for connection between users and genres
  belongs_to :user
  belongs_to :genre
end
