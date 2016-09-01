class User < ApplicationRecord
  has_many :followed_connections, foreign_key: :follower_id, class_name: "Connection"
  has_many :follower_connections, foreign_key: :followed_id, class_name: "Connection"
  has_many :following, through: :followed_connections, source: :followed
  has_many :followers, through: :follower_connections, source: :follower
end
