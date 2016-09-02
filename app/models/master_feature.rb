class MasterFeature < ApplicationRecord
  # Connects master and features
  belongs_to :master_track
  belongs_to :feature_track
end
