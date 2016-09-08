# Generate users
# 10.times do
#   User.create(username: Faker::Internet.user_name, email: Faker::Internet.email, password: "password", profile_pic_file_path: Faker::Avatar.image)
# end

# Connect followers to following
# 10.times do
#   Connection.create(follower_id: (1 + rand(10)), followed_id: (1 + rand(10)))
# end

# Generate songs connected to users
# 10.times do |num|
#   user = User.find(num + 1)
#   user.songs.create(title: Faker::Book.title, key: Faker::Music.key, bpm: (rand(80) + 60), time_signature: "4/4", background: Faker::Lorem.sentence, finished: true)
#   user.songs.create(title: Faker::Book.title, key: Faker::Music.key, bpm: (rand(80) + 60), time_signature: "4/4", background: Faker::Lorem.sentence, finished: false)
# end

# Generate talents
# 5.times do
#   Talent.create(title: Faker::Music.instrument)
# end

Talent.create(title: "Guitar")
Talent.create(title: "Bass")
Talent.create(title: "Drums")
Talent.create(title: "Vocals")
Talent.create(title: "Piano")
Talent.create(title: "Brass")
Talent.create(title: "Orchestral")
Talent.create(title: "Ukulele")
Talent.create(title: "Synthesizer")
Talent.create(title: "Up For Anything")

# Connect talents to users
# 10.times do |num|
#   user = User.find(num + 1)
#   2.times do
#     user.talents << Talent.find((1 + rand(5)))
#   end
# end

# Connect talents to songs
# 20.times do |num|
#   song = Song.find(num + 1)
#   2.times do
#     song.desired_talents << Talent.find((1 + rand(5)))
#   end
# end

# Generate feature tracks
# 20.times do |num|
#   song = Song.find(num + 1)
#   3.times do
#     song.feature_tracks.create(description: Faker::Lorem.sentence, talent_id: (1 + rand(5)), user_id: (1 + rand(10)))
#   end
# end

# Generate master tracks and connect each master track to two feature tracks
# Some master tracks may be connected to the same feature track twice but... whatever.
# 20.times do |num|
#   song = Song.find(num + 1)
#   2.times do
#     song.master_tracks.create(description: Faker::Lorem.sentence)
#   end
#   song.master_tracks.each do |master|
#     2.times do
#       master.feature_tracks << song.feature_tracks.sample
#     end
#   end
# end

# Create comments
# 10.times do |num|
#   user = User.find(num + 1)
#   3.times do
#     user.comments.create(master_track_id: (1 + rand(40)), body: Faker::Lorem.sentence)
#   end
# end

# Create likes
# Here, a user may like the same master track more than once, a feature that won't be on the site.
# 10.times do |num|
#   user = User.find(num + 1)
#   5.times do
#     user.likes.create(master_track_id: (1 + rand(40)))
#   end
# end

# Create genres
Genre.create(name: "Rock")
Genre.create(name: "Hip-hop")
Genre.create(name: "Country")
Genre.create(name: "Jazz")
Genre.create(name: "Folk")
Genre.create(name: "Indie")
Genre.create(name: "Electronic")
Genre.create(name: "Experimental")
Genre.create(name: "Funk")
Genre.create(name: "Pop")

# Connect songs to genres
# A song might end up with the same genre twice, a feature that won't be available on the site.
# 20.times do |num|
#   song = Song.find(num + 1)
#   2.times do
#     song.genres << Genre.find(1 + rand(5))
#   end
# end

# Connect users to their preferred genres
# A user might end up with the same preferred genre twice, a feature that won't be available on the site.
# 10.times do |num|
#   user = User.find(num + 1)
#   2.times do
#     user.genres << Genre.find(1 + rand(5))
#   end
# end
