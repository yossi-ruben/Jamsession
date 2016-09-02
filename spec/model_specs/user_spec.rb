require 'rails_helper'

describe User do
  let(:user_one) { User.create(username: "Greg") }
  let(:user_two) { User.create(username: "Susan")}
  let(:talent) { Talent.create(title: "guitar") }
  let (:genre) { Genre.create(name: "hip-hop")}
  let (:song) { Song.create(background: "had this idea", owner_id: user_one.id)}
  let (:song_two) { Song.create(background: "another idea", owner_id: user_two.id) }
  let (:master_track) { MasterTrack.create(description: "new master", song_id: song.id) }

  describe "it has associations" do 
    it "has followers" do
      user_one.followed_connections.create(followed_id: user_two.id)
      expect(user_two.followers).to match_array [user_one]
    end
  
    it "has users following it" do
      user_one.followed_connections.create(followed_id: user_two.id)
      expect(user_one.following).to match_array [user_two]
    end

    it "has talents" do
      user_one.talents << talent
      expect(user_one.talents[0].title).to eq "guitar"
    end

    it "has preferred genres" do
      user_one.genres << genre
      expect(user_one.genres[0].name).to eq "hip-hop"
    end

    it "can access its comments" do
      user_one.comments.create(master_track_id: 1, body: "great track")
      expect(user_one.comments[0].body).to eq "great track"
    end

    it "can access songs it owns" do
      user_one.songs.create(title: "new song")
      expect(user_one.songs[0].title).to eq "new song"
    end

    it "can like master tracks" do
      user_one.likes.create!(master_track_id: master_track.id)
      expect(user_one.liked_tracks).to match_array [master_track]
    end

    it "has feature tracks" do
      user_one.feature_tracks.create(description: "new violin sound")
      expect(user_one.feature_tracks[0].description).to eq "new violin sound"
    end

    it "can access any master branches that the user's feature branches are incorporated into" do
      new_feature = user_one.feature_tracks.create(description: "new violin sound", song_id: song.id, talent_id: talent.id)
      MasterFeature.create(master_track_id: master_track.id, feature_track_id: new_feature.id)
      expect(user_one.master_tracks.length).to eq 1
    end

    it "can access songs that it has collaborated on" do
      new_feature = user_one.feature_tracks.create(description: "new violin sound", song_id: song.id, talent_id: talent.id)
      song.master_tracks << master_track
      MasterFeature.create(master_track_id: master_track.id, feature_track_id: new_feature.id)
      expect(user_one.collaborated_songs[0]).to eq song
    end
  end
end