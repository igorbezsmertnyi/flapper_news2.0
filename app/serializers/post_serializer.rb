class PostSerializer < ApplicationSerializer
  attributes :id, :title, :content, :comments, :created_at

  has_many :comments
  belongs_to :user
  has_many :upvotes
  has_many :disupvotes
  has_one :cover
end
