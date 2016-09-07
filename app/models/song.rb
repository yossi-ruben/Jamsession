class Song < ApplicationRecord
  include ActiveModel::Serializers::JSON
  # Connects song to owner
  belongs_to :user, foreign_key: :owner_id

  # Connects song to master tracks and feature tracks included in them
  # The association between the song and its included feature tracks is done
  # individually through each master track.
  has_many :master_tracks, dependent: :destroy

  # Connects song to submitted feature tracks
  has_many :feature_tracks, dependent: :destroy

  # Connects song to genres
  has_many :song_genres, dependent: :destroy
  has_many :genres, through: :song_genres

  # Connects song to desired talents
  has_many :song_talents, dependent: :destroy
  has_many :desired_talents, through: :song_talents, source: :talent

  validates :bpm, :key, :time_signature, :title, presence: true
  validates :time_signature, format: { with: /\d\/\d/, message: "must include at least one time signature with beats per bar over note value per beat, e.g.: 3/4 or 4/4" }
end
