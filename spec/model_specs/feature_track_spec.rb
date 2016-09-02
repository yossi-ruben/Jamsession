require 'rails_helper'

describe FeatureTrack do 
  let(:user_one) { User.create(username: "Greg") }
  let(:song) { Song.create(background: "had this idea", owner_id: user_one.id) }
  let(:talent) { Talent.create(title: "guitar") }
  let(:genre) { Genre.create(name: "hip-hop") }
  let(:feature_track) { FeatureTrack.create(description: "new violin sound", song_id: song.id, user_id: user_one.id, talent_id: talent.id) }
  let (:master_track_one) { MasterTrack.create(description: "new master", song_id: song.id) }
  let (:master_track_two) { MasterTrack.create(description: "another master", song_id: song.id) }

  describe "it has associations" do
    it "belongs to a user" do
      expect(feature_track.user).to eq user_one
    end

    it "has a talent" do
      expect(feature_track.talent).to eq talent
    end

    it "can be held in many master tracks" do
      MasterFeature.create(master_track_id: master_track_one.id, feature_track_id: feature_track.id)
      MasterFeature.create(master_track_id: master_track_two.id, feature_track_id: feature_track.id)
      expect(feature_track.master_tracks.length).to eq 2
    end

    it "belongs to a song without having been added to a master track" do
      expect(feature_track.song).to eq song
    end
  end
end