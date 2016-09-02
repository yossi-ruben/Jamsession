require 'rails_helper'

describe Comment do
  let(:user_one) { User.create(username: "Greg") }
  let(:song) { Song.create(background: "had this idea", owner_id: user_one.id) }
  let(:master_track) { MasterTrack.create(description: "new master", song_id: song.id) } 
  let(:comment) { Comment.create(user_id: user_one.id, master_track_id: master_track.id, body: "love it")} 

  describe "it has associations" do 
    it "has a user associated with it" do
      expect(comment.user).to eq user_one
    end

    it "has a master_track associated with it" do
      expect(comment.master_track).to eq master_track
    end
  end
end