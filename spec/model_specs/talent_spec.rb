require 'rails_helper'

describe Talent do 
  let(:user_one) { User.create(username: "Greg") }
  let(:song) { Song.create(background: "had this idea", owner_id: user_one.id) }
  let(:talent) { Talent.create(title: "guitar") }
  let(:feature_track) { FeatureTrack.create(description: "new violin sound", song_id: song.id, user_id: user_one.id, talent_id: talent.id) }

  describe "it has associations" do
    it "has many songs" do
      song.desired_talents << talent
      expect(talent.songs).to match_array [song]
    end

    it "has many users" do
      user_one.talents << talent
      expect(talent.users).to match_array [user_one]
    end

    it "has many feature tracks" do
      expect(talent.feature_tracks).to match_array [feature_track]
    end
  end
end