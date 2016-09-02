class FeatureTrack < ApplicationRecord
  # Connects a feature track to a user for a specific talent
  belongs_to :user
  belongs_to :talent

  # Connects the feature track to whichever master tracks it is included in
  has_many :master_features
  has_many :master_tracks, through: :master_features

  # Connect the feature track to the song
  belongs_to :song
end
