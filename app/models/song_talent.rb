class SongTalent < ApplicationRecord
  # Allows for connection of song to talent
  belongs_to :song
  belongs_to :talent
end
