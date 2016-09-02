class MasterTrack < ApplicationRecord
  # Connects master track to song and owner of song
  belongs_to :song
  belongs_to :song_owner, through: :song, class_name: "User"

  # Connects master track to feature tracks
  has_many :master_features
  has_many :feature_tracks, through: :master_features

  # Connects master track to users who submitted feature tracks and the talents involved
  has_many :contributors, through: :feature_tracks, class_name: "User"
  has_many :talents, through: :feature_tracks

  # Connects master track to comments
  has_many :comments

  # Connects master track to people who liked it
  has_many :likes
  has_many :fans, through: :likes, class_name: "User"
end
