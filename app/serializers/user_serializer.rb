class UserSerializer < ApplicationSerializer
  attributes :id, :first_name, :last_name, :email, :image_url, :session_id

  has_many :posts
  has_many :comments
end
