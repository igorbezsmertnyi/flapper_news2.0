class User < ApplicationRecord
  has_secure_password
  has_secure_token :token

  validates :first_name, :presence => true
  validates :last_name, :presence => true
  validates :email, :presence => true, :uniqueness => true

  has_many :comments
  has_many :posts
  has_one :session
  has_many :upvotes
end
