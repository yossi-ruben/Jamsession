class Like < ApplicationRecord
  # Connects like to user and master track
  belongs_to :user
  belongs_to :master_track
end
