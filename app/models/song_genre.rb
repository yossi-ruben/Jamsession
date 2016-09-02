class SongGenre < ApplicationRecord
  # Allow for songs to genres
  belongs_to :song
  belongs_to :genre
end
