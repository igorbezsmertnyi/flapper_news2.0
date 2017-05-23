class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :user
  has_many :upvotes, dependent: :destroy
  has_many :disupvotes, dependent: :destroy
  has_one :cover, dependent: :destroy
end
