class UserTalent < ApplicationRecord
  # Allows for connection between users and talents
  belongs_to :user
  belongs_to :talent
end
