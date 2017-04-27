class Upvote < ApplicationRecord
  has_many :users
  belongs_to :post
end
