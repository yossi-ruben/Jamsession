require 'rails_helper'

describe Song do
  let(:user_one) { User.create(username: "Greg") }
  let(:song) { Song.create(background: "had this idea", owner_id: user_one.id) }
  let(:talent) { Talent.create(title: "guitar") }
  let(:master_track) { MasterTrack.create(description: "new master", song_id: song.id) }
  let(:genre) { Genre.create(name: "guitar") }
  let(:feature_track) { FeatureTrack.create(description: "new violin sound", song_id: song.id, user_id: user_one.id, talent_id: talent.id) }

  describe "it has associations" do 
    it "has a user" do
      expect(song.user).to eq user_one
    end

    it "has many master tracks" do
      expect(song.master_tracks).to match_array [master_track]
    end

    it "has many feature tracks" do
      expect(song.feature_tracks).to match_array [feature_track]
    end

    it "has many genres" do
      song.genres << genre
      expect(song.genres).to match_array [genre]
    end

    it "has many desired talents" do
      song.desired_talents << talent
      expect(song.desired_talents).to match_array [talent]
    end
  end
end