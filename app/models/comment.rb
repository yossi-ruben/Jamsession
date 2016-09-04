class Comment < ApplicationRecord
  include ActiveModel::Serializers::JSON

  # Connects comment to user
  belongs_to :user

  # Connects comment to master track
  belongs_to :master_track
end
