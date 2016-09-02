require 'rails_helper'

describe Like do
  let(:user_one) { User.create(username: "Greg") }
  let(:song) { Song.create(background: "had this idea", owner_id: user_one.id) }
  let(:master_track) { MasterTrack.create(description: "new master", song_id: song.id) }
  let(:like) { Like.create(master_track_id: master_track.id, user_id: user_one.id) }

  describe "it has associations" do
    it "has a user" do
      expect(like.user).to eq user_one
    end

    it "has a master track" do
      expect(like.master_track).to eq master_track
    end
  end
end