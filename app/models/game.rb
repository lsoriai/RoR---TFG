class Game < ApplicationRecord
  belongs_to :user
  belongs_to :user_2, class_name: User, foreign_key: :user_2_id
  has_many :movements
end
