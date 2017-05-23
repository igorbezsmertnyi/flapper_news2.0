class ApplicationController < ActionController::API
  include ActionController::Serialization
  include SessionHelper
  include PostHelper
end
