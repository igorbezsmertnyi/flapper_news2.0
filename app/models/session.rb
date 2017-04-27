class Session < ApplicationRecord
   has_secure_token :token
   has_one :user
end
