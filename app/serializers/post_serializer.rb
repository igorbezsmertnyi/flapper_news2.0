class PostSerializer < ApplicationSerializer
  attributes :id, :title, :description, :author, :likes, :comments

  has_many :comments
end
