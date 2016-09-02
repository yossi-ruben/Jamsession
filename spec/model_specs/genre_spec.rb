require 'rails_helper'

describe Genre do
  let(:user_one) { User.create(username: "Greg") }
  let(:song) { Song.create(background: "had this idea", owner_id: user_one.id) }
  let(:genre) { Genre.create(name: "hip-hop") }

  describe "it has associations" do
    it "has songs" do
      SongGenre.create(song_id: song.id, genre_id: genre.id)
      expect(genre.songs[0]).to eq song
    end

    it "has users" do
      UserGenre.create(user_id: user_one.id, genre_id: genre.id)
      expect(genre.users[0]).to eq user_one
    end
  end
end