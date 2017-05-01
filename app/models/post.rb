class Post < ApplicationRecord
  has_many :comments
  belongs_to :user
  has_many :upvotes
  has_many :disupvotes
end
