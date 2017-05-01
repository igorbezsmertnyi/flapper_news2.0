class DisupvoteSerializer < ApplicationSerializer
  attributes :id, :user_id

  belongs_to :user
  belongs_to :post
end
