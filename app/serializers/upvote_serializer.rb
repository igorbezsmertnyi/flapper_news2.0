class UpvoteSerializer < ApplicationSerializer
  attributes :id, :user_id

  belongs_to :users
  belongs_to :post
end
