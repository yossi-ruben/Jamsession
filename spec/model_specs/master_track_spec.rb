require 'rails_helper'

describe MasterTrack do
  let(:user_one) { User.create(username: "Greg") }
  let(:user_two) { User.create(username: "Susan") }
  let(:song) { Song.create(background: "had this idea", owner_id: user_one.id) }
  let(:talent) { Talent.create(title: "guitar") }
  let(:master_track) { MasterTrack.create(description: "new master", song_id: song.id) }
  let(:feature_track) { FeatureTrack.create(description: "new violin sound", song_id: song.id, user_id: user_two.id, talent_id: talent.id) }
  let(:comment) { Comment.create(user_id: user_one.id, master_track_id: master_track.id, body: "sweet") }
  let(:like) { Like.create(user_id: user_one.id, master_track_id: master_track.id) }

  describe "it has associations" do
    it "belongs to a song" do 
      expect(master_track.song).to eq song
    end

    it "belongs to a user" do
      expect(master_track.song_owner).to eq user_one
    end

    it "has many feature tracks" do
      MasterFeature.create(master_track_id: master_track.id, feature_track_id: feature_track.id)
      expect(master_track.feature_tracks).to match_array [feature_track]
    end

    it "has many contributors" do
      MasterFeature.create(master_track_id: master_track.id, feature_track_id: feature_track.id)
      expect(master_track.contributors).to match_array [user_two]
    end

    it "has many comments" do
      expect(master_track.comments).to match_array [comment]
    end

    it "has many likes" do
      expect(master_track.likes).to match_array [like]
    end
  end
end